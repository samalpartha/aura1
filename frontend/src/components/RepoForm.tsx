import { useState } from "react";
import { TextField, Button, Flex } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

interface RepoFormProps {
  onSubmit: (url: string) => void;
  isPending: boolean;
}

export function RepoForm({ onSubmit, isPending }: RepoFormProps) {
  const [url, setUrl] = useState("https://github.com/example/repo");

  return (
    <Flex as="form" gap="3" align="center" onSubmit={e => { e.preventDefault(); onSubmit(url); }}>
      <TextField.Root style={{ flexGrow: 1 }}>
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
        <TextField.Input
          placeholder="Enter public GitHub repo URL"
          value={url}
          onChange={e => setUrl(e.target.value)}
          disabled={isPending}
          size="3"
        />
      </TextField.Root>
      <Button type="submit" disabled={isPending} size="3">
        {isPending ? "Analyzing..." : "Analyze"}
      </Button>
    </Flex>
  );
}
