"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { HushboxFile, HushboxFolder } from "@/components/hushbox";
import SearchAndFilter from "@/components/search-filter";
import { toast } from "sonner";

/* ---------------------------- TYPES ---------------------------- */
type NodeType = "hush" | "hushbox";

interface NodeItem {
	_id: string;
	name: string;
	type: NodeType;
	mimeType?: string;
}

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

export default function DrivePage() {
	const router = useRouter();
	const params = useParams();

	const path = (params.path as string[]) || [];
	const currentFolderId = path.length === 0 ? null : path[path.length - 1];

	const [folders, setFolders] = useState<NodeItem[]>([]);
	const [files, setFiles] = useState<NodeItem[]>([]);
	const [loading, setLoading] = useState(true);

	/* ---------------------------- LOAD DATA ---------------------------- */
	useEffect(() => {
		const loadData = async () => {
			try {
				setLoading(true);
				const parentId = currentFolderId ?? "null";

				const data = await apiFetch(
					`/api/node/fetch?parentId=${parentId}`,
				);

				const hushboxes = data.filter(
					(n: NodeItem) => n.type === "hushbox",
				);
				const hushes = data.filter((n: NodeItem) => n.type === "hush");

				setFolders(hushboxes);
				setFiles(hushes);
			} catch (err: unknown) {
				console.error(err);
				toast.error(
					err instanceof Error ? err.message : "Failed to load data",
					{
						duration: 4000,
						richColors: true,
					},
				);
			} finally {
				setLoading(false);
			}
		};

		loadData();
	}, [currentFolderId]);

	/* ---------------------------- NAVIGATION ---------------------------- */
	const openFolder = (id: string) => {
		router.push(`/drive/${[...path, id].join("/")}`);
	};

	/* ---------------------------- CREATE ---------------------------- */
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
				{
					_id: hushbox._id,
					name: hushbox.name,
					type: "hushbox",
				},
			]);
		} catch (err: unknown) {
			toast.error(
				err instanceof Error ? err.message : "Failed to create folder",
			);
		}
	};

	/* ---------------------------- DELETE ---------------------------- */
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

	/* ---------------------------- RENDER ---------------------------- */
	return (
		<main>
			{/* Search + Create */}
			<SearchAndFilter
				onCreateHush={createHush}
				onCreateHushbox={createHushbox}
			/>

			{/* Grid */}
			<section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{loading ? (
					<p className="text-center text-gray-500">Loading...</p>
				) : (
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
						{/* Folders */}
						{folders.map((folder) => (
							<HushboxFolder
								key={folder._id}
								_id={folder._id}
								hushboxName={folder.name}
								onOpen={() => openFolder(folder._id)}
								onDelete={() =>
									deleteNode(folder._id, "hushbox")
								}
								onRename={() =>
									console.log("Rename is not working yet")
								}
							/>
						))}

						{/* Files */}
						{files.map((file) => (
							<HushboxFile
								key={file._id}
								_id={file._id}
								hushName={file.name}
								hushType={file.mimeType || ""}
								onDelete={() => deleteNode(file._id, "hush")}
								onRename={() =>
									console.log("Rename is not yet built")
								}
							/>
						))}
					</div>
				)}
			</section>
		</main>
	);
}
