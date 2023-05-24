import { ModalDialog } from "~/components/ui/ModalDialog";
import { PopUp } from "~/components/ui/PopUp";
import { Form } from "./Form";
import { useDeleteUser, useUnassignProductToUser } from "~/hooks/useUsers";

export const Actions = ({ setOpen, open, refetch }) => {

    const { mutate: deleteUser } = useDeleteUser(
        setOpen,
        open,
        refetch
    );

    const { mutate: unassignProductToUser } = useUnassignProductToUser(
        setOpen,
        open,
        refetch
    );

    const submitHandler = () => {
        if (open.title === "delete") {
            deleteUser(open.id);
        } else if (open.title === "delete-unassign") {
            const unassignProductToUserObj = {
                user_id: open.info._id,
                product_id: open?.id,
            };
            unassignProductToUser(unassignProductToUserObj);
        }
    };

    return (
        <>
            {open.modalDialog && (
                <ModalDialog
                    onClick={submitHandler}
                    title={"האם את/ה בטוח ?"}
                    setOpen={setOpen}
                    open={open}
                />
            )}
            {open.popUp && (
                <PopUp setOpen={setOpen} open={open}>
                    <Form
                        refetch={refetch}
                        setOpen={setOpen}
                        open={open}
                    />
                </PopUp>
            )}
        </>
    );
};

