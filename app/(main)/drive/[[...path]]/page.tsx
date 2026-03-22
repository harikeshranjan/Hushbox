"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { HushboxFile, HushboxFolder } from "@/components/hushbox";
import SearchAndFilter from "@/components/search-filter";
import { toast } from "sonner";
import Editor from "@monaco-editor/react";

/* ---------------------------- TYPES ---------------------------- */
type NodeType = "hush" | "hushbox";

interface NodeItem {
	_id: string;
	name: string;
	type: NodeType;
	mimeType?: string;
}

type ViewMode = "drive" | "hush";

/* ---------------------------- API HELPER ---------------------------- */
async function apiFetch(url: string, options?: RequestInit) {
	const res = await fetch(url, options);

	if (!res.ok) {
		let errorMessage = "Something went wrong";
		try {
			const error = await res.json();
			errorMessage = error?.message || errorMessage;
		} catch {}
		throw new Error(errorMessage);
	}

	return res.json();
}

/* ---------------------------- HUSH VIEW ---------------------------- */
function HushView({ id }: { id: string }) {
	const [file, setFile] = useState<NodeItem & { content?: string }>();
	const [content, setContent] = useState("");
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);

	useEffect(() => {
		const load = async () => {
			try {
				const data = await apiFetch(`/api/hush/${id}`);
				setFile(data);
				setContent(data.content || "");
			} catch (err) {
				console.error(err);
				toast.error("Failed to load file");
			} finally {
				setLoading(false);
			}
		};
		load();
	}, [id]);

	const save = async () => {
		try {
			setSaving(true);
			await apiFetch(`/api/hush/${id}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ content }),
			});
			toast.success("Saved!", { richColors: true });
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Failed to save", {
				richColors: true,
			});
		} finally {
			setSaving(false);
		}
	};

	/* Keyboard shortcut: Ctrl/Cmd + S */
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.ctrlKey || e.metaKey) && e.key === "s") {
				e.preventDefault();
				save();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [content]);

	if (loading) {
		return (
			<div className="flex flex-col gap-4 px-6 py-6 mt-20">
				{/* Header skeleton */}
				<div className="flex items-center justify-between">
					<div className="h-5 w-48 rounded-md bg-muted/60 animate-pulse" />
					<div className="h-8 w-20 rounded-md bg-muted/60 animate-pulse" />
				</div>
				{/* Editor skeleton */}
				<div className="h-[500px] rounded-lg bg-muted/40 animate-pulse" />
			</div>
		);
	}

	if (!file) {
		return (
			<div className="flex items-center justify-center h-[60vh]">
				<p className="text-sm text-muted-foreground">File not found.</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col px-6 py-6 gap-4 animate-in fade-in duration-200">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3 min-w-0">
					<h1 className="text-base font-semibold truncate">
						{file.name}
					</h1>
					{file.mimeType && (
						<span className="shrink-0 text-[11px] font-medium text-muted-foreground uppercase tracking-widest">
							{file.mimeType}
						</span>
					)}
				</div>

				<div className="flex items-center gap-2 shrink-0 ml-4">
					<span className="hidden sm:block text-xs text-muted-foreground">
						{saving ? "" : "⌘S to save"}
					</span>
					<button
						onClick={save}
						disabled={saving}
						className="flex items-center gap-1.5 px-4 py-1.5 text-sm rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50 transition-all duration-150"
					>
						{saving ? (
							<>
								<svg
									className="animate-spin w-3.5 h-3.5"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
								>
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
									/>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8v8H4z"
									/>
								</svg>
								Saving
							</>
						) : (
							"Save"
						)}
					</button>
				</div>
			</div>

			{/* Editor */}
			<div className="rounded-lg overflow-hidden border border-border w-full">
				<Editor
					height="calc(100vh - 170px)"
					language={file.mimeType?.toLowerCase() || "plaintext"}
					value={content}
					onChange={(val) => setContent(val || "")}
					theme="vs-dark"
					options={{
						fontSize: 14,
						minimap: { enabled: false },
						scrollBeyondLastLine: false,
						wordWrap: "on",
						padding: { top: 16, bottom: 16 },
						smoothScrolling: true,
						cursorBlinking: "smooth",
						lineNumbers: "on",
						renderLineHighlight: "gutter",
					}}
				/>
			</div>
		</div>
	);
}

/* ---------------------------- DRIVE VIEW ---------------------------- */
function DriveView({
	path,
	currentFolderId,
}: {
	path: string[];
	currentFolderId: string | null;
}) {
	const router = useRouter();
	const [folders, setFolders] = useState<NodeItem[]>([]);
	const [files, setFiles] = useState<NodeItem[]>([]);
	const [loading, setLoading] = useState(true);

	/* LOAD DATA */
	useEffect(() => {
		const loadData = async () => {
			try {
				setLoading(true);
				const parentId = currentFolderId ?? "null";
				const data = await apiFetch(
					`/api/node/fetch?parentId=${parentId}`,
				);
				setFolders(data.filter((n: NodeItem) => n.type === "hushbox"));
				setFiles(data.filter((n: NodeItem) => n.type === "hush"));
			} catch (err: unknown) {
				console.error(err);
				toast.error(
					err instanceof Error ? err.message : "Failed to load data",
					{ duration: 4000, richColors: true },
				);
			} finally {
				setLoading(false);
			}
		};
		loadData();
	}, [currentFolderId]);

	/* NAVIGATION */
	const openFolder = (id: string) => {
		router.push(`/drive/${[...path, id].join("/")}`);
	};
	const openFile = (id: string) => {
		router.push(`/drive/hush/${id}`);
	};

	/* CREATE */
	const createHush = async (name: string, type: string) => {
		try {
			const hush = await apiFetch("/api/hush/create", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name,
					parentId: currentFolderId,
					hushType: type,
				}),
			});
			setFiles((prev) => [
				...prev,
				{
					_id: hush._id,
					name: hush.name,
					type: "hush",
					mimeType: hush.mimeType,
				},
			]);
		} catch (err: unknown) {
			toast.error(
				err instanceof Error ? err.message : "Failed to create file",
			);
		}
	};

	const createHushbox = async (name: string) => {
		try {
			const hushbox = await apiFetch("/api/hushbox/create", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, parentId: currentFolderId }),
			});
			setFolders((prev) => [
				...prev,
				{ _id: hushbox._id, name: hushbox.name, type: "hushbox" },
			]);
		} catch (err: unknown) {
			toast.error(
				err instanceof Error ? err.message : "Failed to create folder",
			);
		}
	};

	/* DELETE */
	const deleteNode = async (id: string, type: NodeType) => {
		try {
			await apiFetch(`/api/${type}/delete?id=${id}`, {
				method: "DELETE",
			});
			if (type === "hush") {
				setFiles((prev) => prev.filter((f) => f._id !== id));
			} else {
				setFolders((prev) => prev.filter((f) => f._id !== id));
			}
		} catch (err: unknown) {
			toast.error(
				err instanceof Error ? err.message : "Failed to delete",
			);
		}
	};

	const isEmpty = !loading && folders.length === 0 && files.length === 0;

	return (
		<main>
			<SearchAndFilter
				onCreateHush={createHush}
				onCreateHushbox={createHushbox}
			/>

			<section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Loading skeleton */}
				{loading && (
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
						{Array.from({ length: 12 }).map((_, i) => (
							<div
								key={i}
								className="h-28 rounded-xl bg-muted/60 animate-pulse"
								style={{ animationDelay: `${i * 35}ms` }}
							/>
						))}
					</div>
				)}

				{/* Empty state */}
				{isEmpty && (
					<div className="flex flex-col items-center justify-center py-24 text-center">
						<p className="text-sm text-muted-foreground">
							This folder is empty.
						</p>
					</div>
				)}

				{/* Content */}
				{!loading && !isEmpty && (
					<div className="space-y-8">
						{/* Folders */}
						{folders.length > 0 && (
							<div>
								<p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">
									Folders
								</p>
								<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
									{folders.map((folder, i) => (
										<div
											key={folder._id}
											className="animate-in fade-in slide-in-from-bottom-1 duration-200"
											style={{
												animationDelay: `${i * 25}ms`,
												animationFillMode: "both",
											}}
										>
											<HushboxFolder
												_id={folder._id}
												hushboxName={folder.name}
												onOpen={() =>
													openFolder(folder._id)
												}
												onDelete={() =>
													deleteNode(
														folder._id,
														"hushbox",
													)
												}
												onRename={() =>
													console.log(
														"Rename is not working yet",
													)
												}
											/>
										</div>
									))}
								</div>
							</div>
						)}

						{/* Files */}
						{files.length > 0 && (
							<div>
								<p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">
									Files
								</p>
								<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
									{files.map((file, i) => (
										<div
											key={file._id}
											className="animate-in fade-in slide-in-from-bottom-1 duration-200"
											style={{
												animationDelay: `${(folders.length + i) * 25}ms`,
												animationFillMode: "both",
											}}
										>
											<HushboxFile
												_id={file._id}
												hushName={file.name}
												hushType={file.mimeType || ""}
												onDelete={() =>
													deleteNode(file._id, "hush")
												}
												onRename={() =>
													console.log(
														"Rename is not yet built",
													)
												}
												onOpen={() =>
													openFile(file._id)
												}
											/>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				)}
			</section>
		</main>
	);
}

/* ---------------------------- PAGE (ROUTER) ---------------------------- */
export default function DrivePage() {
	const params = useParams();
	const path = (params.path as string[]) || [];

	// Detect /drive/hush/[id]
	const viewMode: ViewMode =
		path[0] === "hush" && path.length === 2 ? "hush" : "drive";

	if (viewMode === "hush") {
		return <HushView id={path[1]} />;
	}

	const currentFolderId = path.length === 0 ? null : path[path.length - 1];
	return <DriveView path={path} currentFolderId={currentFolderId} />;
}
