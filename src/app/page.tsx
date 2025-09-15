import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Button variant={"elevated"} className="m-10">
        Something
      </Button>
      <div>
        <Input placeholder="something" />
        <Progress value={50} />
        <Textarea placeholder="something" />
      </div>
    </div>
  );
}
