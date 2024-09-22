"use client";

import { useSession } from "@/lib/utils/session";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Language } from "@/entities/Language";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Snippet } from "@/entities/Snippet";
import SnippetCard from "@/components/pages/Snippet/SnippetCard";
import SnippetTextarea from "@/components/pages/Snippet/SnippetCodeForm";

enum SortableBy {
  Likes = "Likes",
  Date = "Dato",
  Favorites = "Favoriter",
}

export default function SnippetsPage() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    Language.Any
  );
  const [selectedSortableBy, setSelectedSortableBy] = useState<SortableBy>(
    SortableBy.Date
  );
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchUser, setSearchUser] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [snippetLanguage, setSnippetLanguage] = useState<Language>(
    Language.Any
  );
  const [snippetLanguageDialog, setSnippetLanguageDialog] =
    useState<Language>();
  const [description, setDescription] = useState<string>("");
  const session = useSession();

  const languageOptions = Object.values(Language);
  const sortableByOptions = Object.values(SortableBy);

  useEffect(() => {
    // Fetch snippets from the backend based on the selected filters
    async function fetchSnippets() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Snippet`
      );
      const result = await response.json();
      console.log(result);
      setSnippets(result);
    }
    fetchSnippets();
  }, [selectedLanguage, selectedSortableBy, searchQuery, searchUser]);

  function handleCreateSnippet() {
    if (snippetLanguageDialog === undefined) {
      alert("Vælg et sprog for snippetet");
      return;
    }
    const snippet = new Snippet(
      undefined,
      title,
      code,
      description,
      0,
      snippetLanguageDialog,
      new Date(),
      session.session?.user
    );

    const snippetJson = JSON.stringify(snippet);

    console.log("Creating snippet:", snippet);

    // Send the snippet to the backend
    // API URL: process.env.NEXT_PUBLIC_API_URL/api/Snippet
    // Method: POST
    // Headers: { "Content-Type": "application/json" }

    // Example fetch request
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Snippet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: snippetJson,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Snippet created successfully:", data);

        setTitle("");
        setCode("");
        setDescription("");
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });

    console.log(snippet);
  }

  function sortSnippets(snippets: Snippet[]): Snippet[] {
    switch (selectedSortableBy) {
      case SortableBy.Likes:
        return snippets.sort((a, b) => b.likes - a.likes);
      case SortableBy.Date:
        return snippets.sort(
          (a, b) =>
            new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime()
        );
      case SortableBy.Favorites:
        // Assuming you have a favorites property or a way to determine favorites
        // return snippets.sort((a, b) => b. - a.favorites);
        alert("Not implemented");
      default:
        return snippets;
    }
  }

  const filteredSnippets = snippets.filter(
    (snippet) =>
      (selectedLanguage === Language.Any ||
        snippet.language === selectedLanguage) &&
      (searchQuery === "" ||
        snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        snippet.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase())) &&
      (searchUser === "" ||
        snippet.createdBy?.name
          .toLowerCase()
          .includes(searchUser.toLowerCase()))
  );

  const sortedSnippets = sortSnippets(filteredSnippets);

  return (
    <main className="flex flex-col items-center gap-10 py-10 px-5 ">
      <section className="flex w-full justify-center items-center flex-col text-center">
        <p className="text-xl font-semibold">Velkommen til</p>
        <h1 className="text-4xl m-4 font-bold antialiased">
          Code Snippet Hjælper
        </h1>
        <p className="text-lg">
          Her kan du finde en masse forskellige kodeeksempler, som du kan bruge
          i dine egne projekter.
        </p>
      </section>
      {session && (
        <section className="flex flex-wrap justify-end px-10 gap-3 w-full max-w-5xl">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Opret nyt snippet</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] w-[100vw]">
              <DialogHeader>
                <DialogTitle>Opret nyt snippet</DialogTitle>
                <DialogDescription>
                  Opret nyt snippet ved at udfylde felterne nedenfor.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Titel
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <SnippetTextarea setCodeOtherFile={setCode} />
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Beskrivelse
                  </Label>
                  <Input
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="language" className="text-right">
                    Sprog
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setSnippetLanguageDialog(value as Language)
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Vælg et sprog" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Sprog</SelectLabel>
                        {languageOptions
                          .filter((lang) => lang !== Language.Any)
                          .map((lang) => (
                            <SelectItem key={lang} value={lang}>
                              {lang}
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleCreateSnippet}>
                  Opret snippet
                </Button>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </section>
      )}
      {/* Search & Query */}
      <section className="w-full flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-5">Søg i kodeeksempler</h2>
        <form className="flex flex-wrap justify-center gap-3 w-full max-w-5xl">
          {/* Language */}
          <div className="w-full sm:w-auto">
            <Select
              onValueChange={(value) => setSelectedLanguage(value as Language)}
            >
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Vælg et sprog" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sprog</SelectLabel>
                  {languageOptions.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {/* Sortable by */}
          <div className="w-full sm:w-auto">
            <Select
              onValueChange={(value) =>
                setSelectedSortableBy(value as SortableBy)
              }
            >
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sorter efter" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sorter efter</SelectLabel>
                  {sortableByOptions.map((sort) => (
                    <SelectItem key={sort} value={sort}>
                      {sort}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {/* Search by title or description */}
          <div className="w-full sm:w-auto">
            <Input
              type="text"
              placeholder="Søg efter kodeeksempler"
              className="w-full sm:w-64"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {/* Search by user */}
          <div className="w-full sm:w-auto">
            <Input
              type="text"
              placeholder="Søg efter bruger"
              className="w-full sm:w-64"
              onChange={(e) => setSearchUser(e.target.value)}
            />
          </div>
        </form>
      </section>
      {/* Snippets */}
      <section className="w-full flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-5">Kodeeksempler</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-5xl">
          {sortedSnippets.map((snippet) => (
            <SnippetCard key={snippet.snippetId} snippet={snippet} />
          ))}
        </div>
      </section>
    </main>
  );
}
