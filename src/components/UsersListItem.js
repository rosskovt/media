import Button from "./Button";
import { GoTrashcan } from "react-icons/go";
import { removeUser } from "../store";
import { useThunk } from "../hooks/use-thunk";

function UsersListItem({ user }) {
    const [doRemoveUser, isLoading, error] = useThunk(removeUser);

    const handleUserDelete = (user) => {
        doRemoveUser(user);
    };

    return (
        <div key={user.id} className="mb-2 border rounded">
            <div className='flex p-2 justify-between items-center cursor-pointer'>
                <div className="flex flex-row justify-between items-center">
                    <Button className="mr-3" onClick={() => handleUserDelete(user)} loading={isLoading}>
                        <GoTrashcan />
                    </Button>
                    {
                        error && <div>"Error deletinng user"</div>
                    }
                    {user.name}
                </div>
            </div>
        </div>
    )
}

export default UsersListItem;