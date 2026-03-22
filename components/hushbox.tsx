"use client";

import { useState } from "react";
import Image from "next/image";
import { Edit, EllipsisVertical, Trash } from "lucide-react";

import { GlowingEffect } from "./ui/glowing-effect";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { NativeSelect, NativeSelectOption } from "./ui/native-select";
import { hushTypes } from "@/lib/hush-type";

/* -------------------------------- HUSHBOX FOLDER -------------------------------- */
type HushboxFolderProps = {
	_id: string;
	hushboxName: string;
	onOpen: (_id: string) => void;
	onRename: (_id: string, newName: string) => void;
	onDelete: (_id: string) => void;
};

export function HushboxFolder({
	_id,
	hushboxName,
	onOpen,
	onRename,
	onDelete,
}: HushboxFolderProps) {
	const [renameValue, setRenameValue] = useState(hushboxName);

	return (
		<div
			className="relative h-44 border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 flex flex-col backdrop-blur-md bg-white/10 dark:bg-neutral-900 cursor-pointer hover:scale-[1.02] transition-transform"
			onClick={() => onOpen(_id)}
		>
			<GlowingEffect
				spread={40}
				glow={true}
				disabled={false}
				proximity={64}
				inactiveZone={0.01}
			/>

			{/* Centered Image */}
			<div className="flex flex-1 items-center justify-center">
				<Image
					src="/hushbox-folder.png"
					alt="Hushbox"
					width={70}
					height={70}
				/>
			</div>

			{/* Name */}
			<span
				className="mt-2 text-sm text-center truncate w-full"
				title={hushboxName}
			>
				{hushboxName}
			</span>

			{/* Menu */}
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button className="absolute top-3 right-3 rounded-md p-1 text-neutral-500 hover:text-neutral-300 hover:bg-white/5 focus:outline-none">
						<EllipsisVertical size={20} />
					</button>
				</DropdownMenuTrigger>

				<DropdownMenuContent
					align="end"
					sideOffset={6}
					className="z-50"
				>
					{/* Rename */}
					<Dialog>
						<DialogTrigger asChild>
							<DropdownMenuItem
								onSelect={(e) => e.preventDefault()}
								onClick={() => setRenameValue(hushboxName)}
								className="flex items-center gap-2 cursor-pointer"
							>
								<Edit className="h-4 w-4" />
								Rename
							</DropdownMenuItem>
						</DialogTrigger>

						<DialogContent>
							<DialogHeader>
								<DialogTitle>Rename Hushbox</DialogTitle>
								<DialogDescription>
									Enter a new name for this hushbox.
								</DialogDescription>
							</DialogHeader>

							<input
								autoFocus
								type="text"
								value={renameValue}
								onChange={(e) => setRenameValue(e.target.value)}
								className="w-full px-4 py-2.5 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg"
							/>

							<DialogFooter className="mt-4">
								<DialogClose asChild>
									<Button variant="outline">Cancel</Button>
								</DialogClose>

								<DialogClose asChild>
									<Button
										type="button"
										onClick={() => {
											if (!renameValue.trim()) return;
											onRename(_id, renameValue.trim());
										}}
									>
										Rename
									</Button>
								</DialogClose>
							</DialogFooter>
						</DialogContent>
					</Dialog>

					{/* Delete */}
					<DropdownMenuItem
						onClick={() => onDelete(_id)}
						className="text-red-500 flex items-center gap-2 cursor-pointer hover:bg-red-500"
					>
						<Trash className="h-4 w-4 group-hover:text-neutral-200" />
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}

/* -------------------------------- HUSH FILE -------------------------------- */
type HushboxFileProps = {
	_id: string;
	hushName: string;
	hushType: string;
	onRename: (_id: string, newName: string, newType: string) => void;
	onDelete: (_id: string) => void;
};

export function HushboxFile({
	_id,
	hushName,
	hushType,
	onRename,
	onDelete,
}: HushboxFileProps) {
	const [renameValue, setRenameValue] = useState(hushName);
	const [renameType, setRenameType] = useState(hushType);
	// const [typeValue, setTypeValue] = useState(hushType);

	return (
		<div className="relative h-44 border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 flex flex-col items-center justify-between backdrop-blur-md bg-white/10 dark:bg-neutral-900">
			<GlowingEffect
				spread={40}
				glow
				proximity={64}
				inactiveZone={0.01}
			/>

			<Badge variant="outline">{hushType}</Badge>

			<Image src="/hushbox-file.png" alt="Hush" width={70} height={70} />

			<span
				className="text-sm truncate w-full text-center"
				title={hushName}
			>
				{hushName}
			</span>

			{/* Menu */}
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button className="absolute top-3 right-3 rounded-md p-1 text-neutral-500 hover:text-neutral-300 hover:bg-white/5 focus:outline-none">
						<EllipsisVertical size={20} />
					</button>
				</DropdownMenuTrigger>

				<DropdownMenuContent
					align="end"
					sideOffset={6}
					className="z-50"
				>
					{/* Rename */}
					<Dialog>
						<DialogTrigger asChild>
							<DropdownMenuItem
								onSelect={(e) => e.preventDefault()}
								onClick={() => {
									setRenameValue(hushName);
									setRenameType(hushType);
								}}
								className="flex items-center gap-2 cursor-pointer"
							>
								<Edit className="h-4 w-4" />
								Rename
							</DropdownMenuItem>
						</DialogTrigger>

						<DialogContent>
							<DialogHeader>
								<DialogTitle>Rename Hush</DialogTitle>
								<DialogDescription>
									Update the name and type of this hush.
								</DialogDescription>
							</DialogHeader>

							<div className="flex gap-4">
								<input
									autoFocus
									type="text"
									value={renameValue}
									onChange={(e) =>
										setRenameValue(e.target.value)
									}
									className="w-full px-4 py-2.5 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg"
								/>

								<NativeSelect
									className="w-32 h-12"
									value={renameType}
									onChange={(e) =>
										setRenameType(e.target.value)
									}
								>
									{hushTypes.map((type) => (
										<NativeSelectOption
											key={type.id}
											value={type.id}
										>
											{type.name}
										</NativeSelectOption>
									))}
								</NativeSelect>
							</div>

							<DialogFooter className="mt-4">
								<DialogClose asChild>
									<Button variant="outline">Cancel</Button>
								</DialogClose>

								<DialogClose asChild>
									<Button
										type="button"
										onClick={() => {
											if (!renameValue.trim()) return;
											onRename(
												_id,
												renameValue.trim(),
												renameType,
											);
										}}
									>
										Rename
									</Button>
								</DialogClose>
							</DialogFooter>
						</DialogContent>
					</Dialog>

					{/* Delete */}
					<DropdownMenuItem
						onClick={() => onDelete(_id)}
						className="text-red-500 flex items-center gap-2 cursor-pointer hover:bg-red-500"
					>
						<Trash className="h-4 w-4 group-hover:text-neutral-200" />
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
