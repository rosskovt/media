import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import SkeletonLoader from './SkeletonLoader';
import Button from "./Button";
import AlbumsListItem from "./AlbumListItem";

function AlbumsList({ user }) {

    const { data, isFetching, error } = useFetchAlbumsQuery(user);
    const [addAlbum, results] = useAddAlbumMutation();

    let content;
    if (isFetching) {
        content = <SkeletonLoader times={3} className="h-10 w-full" />;
    } else if (error) {
        <div>Errors loading albums.</div>
    } else {
        content = data.map((album) => {
            return <AlbumsListItem key={album.id} album={album} />
        });
    }

    const handleAddAlbum = () => {
        addAlbum(user);
    };

    return (
        <div>
            <div className="m-2 flex flex-row justify-between items-center">
                <h3 className="text-lg font-bold">List of albums for {user.name}</h3>
                <Button loading={results.isLoading} onClick={handleAddAlbum}>+ Add Album</Button>
            </div>
            <div>{content}</div>
        </div>
    )
};

export default AlbumsList;