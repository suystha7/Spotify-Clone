import { Album } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import AlbumsTable from "./AlbumsTable";

const AlbumTabContent = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Album className="size-5 text-emerald-500" /> Albums
            </CardTitle>
            <CardDescription>Manage your album tracks</CardDescription>
          </div>
          <Button>+</Button>
        </div>
      </CardHeader>
      <CardContent>
        <AlbumsTable />
      </CardContent>
    </Card>
  );
};

export default AlbumTabContent;
