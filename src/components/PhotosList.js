import { useFetchPhotosQuery, useAddPhotoMutation } from "../store";
import PhotoListItem from "./PhotoListItem";
import SkeletonLoader from "./SkeletonLoader";
import Button from "./Button";

function PhotosList({ album }) {
    const { data, isFetching, error } = useFetchPhotosQuery(album);
    const [addPhoto, results] = useAddPhotoMutation();

    const handleAddPhoto = () => {
        addPhoto(album);
    };

    let content;
    if (isFetching) {
        content = <SkeletonLoader times={4} className="h-8 w-8" />;
    } else if (error) {
        <div>Errors loading photos.</div>
    } else {
        content = data.map((photo) => {
            return <PhotoListItem key={photo.id} photo={photo} />
        });
    }

    return (
        <div>
            <div className="m-2 flex flex-row justify-between items-center">
                <h3 className="text-lg font-bold">List of photos for {album.title}</h3>
                <Button loading={results.isLoading} onClick={handleAddPhoto}>+ Add Photo</Button>
            </div>
            <div className="mx-8 flex flex-row flex-wrap justify-center">{content}</div>
        </div>
    )
};

export default PhotosList;