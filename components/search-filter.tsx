'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Search, SlidersHorizontal } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { NativeSelect, NativeSelectOption } from "./ui/native-select";
import { hushTypes } from "@/lib/hush-type";

type SearchAndFilterProps = {
  onCreateHush: (name: string, type: string) => void;
  onCreateHushbox: (name: string) => void;
};

function SearchAndFilter({ onCreateHush, onCreateHushbox }: SearchAndFilterProps) {
  const [sortBy, setSortBy] = useState("newest");
  const [hushName, setHushName] = useState<string>("Unnamed Hush");
  const [hushType, setHushType] = useState<string>("text");
  const [hushboxName, setHushboxName] = useState<string>("Unnamed Hushbox");

  return (
    <section className="sticky top-16 z-40 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60 dark:bg-neutral-900/95 border-b border-neutral-200 dark:border-neutral-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500 dark:text-neutral-400" />
            <Input
              type="text"
              placeholder="Search Hushboxes..."
              className="pl-10 bg-white dark:bg-neutral-950 border-neutral-300 dark:border-neutral-700 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600"
            />
          </div>

          {/* Filter and Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Filter Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="default" className="gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="hidden sm:inline">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                  <DropdownMenuRadioItem value="newest">
                    Newest to Oldest
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="oldest">
                    Oldest to Newest
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="name-asc">
                    Name (A-Z)
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="name-desc">
                    Name (Z-A)
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="size-desc">
                    Size (Largest)
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="size-asc">
                    Size (Smallest)
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Type</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value="all">
                  <DropdownMenuRadioItem value="all">
                    All Items
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="hushboxes">
                    Hushboxes Only
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="files">
                    Hushes Only
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* New Item Buttons */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default" size="default" className="gap-2">
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">New Hush</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Create New Hush</DialogTitle>
                  <DialogDescription>
                    Enter new hush name and the type of hush you want to create.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex gap-4 justify-between items-center">
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-600 focus:border-transparent transition-all"
                    placeholder="Enter hush name"
                    value={hushName}
                    onChange={(e) => setHushName(e.target.value)}
                    required
                  />
                  <NativeSelect className="w-32 h-12" value={hushType} onChange={(e) => setHushType(e.target.value)}>
                    {hushTypes.map(type => (
                      <NativeSelectOption key={type.id} value={type.id}>
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
                      type="submit"
                      onClick={() => {
                        onCreateHush(hushName, hushType);
                        setHushName("Unnamed Hush");
                        setHushType("text");
                      }}
                    >
                      <Plus className="h-4 w-4" />
                      Create Hush
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="default"
                  size="default"
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  <span className="hidden lg:inline">New Hushbox</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Create New Hushbox</DialogTitle>
                  <DialogDescription>
                    Enter the name for your new hushbox.
                  </DialogDescription>
                </DialogHeader>
                <div>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-600 focus:border-transparent transition-all"
                    placeholder="Enter hushbox name"
                    value={hushboxName}
                    onChange={(e) => setHushboxName(e.target.value)}
                    required
                  />
                </div>
                <DialogFooter className="mt-4">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button
                      type="button"
                      onClick={() => {
                        onCreateHushbox(hushboxName);
                        setHushboxName("Unnamed Hushbox");
                      }}
                    >
                      <Plus className="h-4 w-4" />
                      Create Hushbox
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SearchAndFilter