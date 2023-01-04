import Button from "./Button";
import { GoTrashcan } from "react-icons/go";
import { removeUser } from "../store";
import { useThunk } from "../hooks/use-thunk";
import ExpandablePanel from "./ExpandablePanel";
import AlbumsList from "./AlbumsList";

function UsersListItem({ user }) {
    const [doRemoveUser, isLoading, error] = useThunk(removeUser);

    const handleUserDelete = (user) => {
        doRemoveUser(user);
    };

    const header = <>
        <Button className="mr-3" onClick={() => handleUserDelete(user)} loading={isLoading}>
            <GoTrashcan />
        </Button>
        {
            error && <div>"Error deletinng user"</div>
        }
        {user.name}
    </>;

    return (
        <ExpandablePanel header={header}>
            <AlbumsList user={user} />
        </ExpandablePanel>
    );
}

export default UsersListItem;