import { useRemovePhotoMutation } from '../store'
import { GoTrashcan } from 'react-icons/go';
import Button from './Button';


function PhotoListItem({ photo }) {
    const [removePhoto, results] = useRemovePhotoMutation();

    const handleRemovePhoto = (photo) => {
        removePhoto(photo);
    };

    return (
        <div className="m-2 cursor-pointer relative" onClick={() => handleRemovePhoto(photo)}>
            {results.error && <div>"Error deletinng photo"</div>}
            {photo.title}
            <img className='h-20 w-20' src={photo.url} alt={`random pic ${photo.id}`} />
            <div className='absolute inset-0 flex items-center justify-between hover:bg-gray-200 opacity-0 hover:opacity-80'>
                <Button className="absolute text-3xl ml-3 flex flex-row items-center justify-between" loading={results.isLoading}>
                    <GoTrashcan className="text-3xl" />
                </Button>
            </div>
        </div>
    )
}

export default PhotoListItem;


