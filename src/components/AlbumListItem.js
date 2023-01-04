import { useRemoveAlbumMutation } from "../store";
import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";
import { GoTrashcan } from "react-icons/go";

function AlbumsListItem({ album }) {
    const [removeAlbum, removeAlbumResult] = useRemoveAlbumMutation();

    const handleRemoveAlbum = (album) => {
        removeAlbum(album);
    };

    const header =
        <div className="mr-2 flex flex-row items-center justify-between">
            <Button
                className="mr-3"
                loading={removeAlbumResult.isLoading}
                onClick={() => handleRemoveAlbum(album)}>
                <GoTrashcan />
            </Button>
            {removeAlbumResult.error && <div>"Error deletinng album"</div>}
            {album.title}
        </div>
    return <ExpandablePanel key={album.id} header={header}>
        List of photos in the album
    </ExpandablePanel>
}

export default AlbumsListItem;