import { ModalDialog, PopUp } from "~/components/ui";
import { useDeleteMainCategory, useUnassignSemiCategoryToMainCategory } from "~/hooks/useMainCategory";
import { Form } from "./Form";

export const Actions = ({ setOpen, open, refetch }) => {

    const { mutate: deleteMainCategory } = useDeleteMainCategory(setOpen, open, refetch);
    const { mutate: unassignSemiCategoryToMainCategory } = useUnassignSemiCategoryToMainCategory(setOpen, open, refetch);

    const submitHandler = () => {
        if (open.title === "delete") {
            deleteMainCategory(open.id);
        } else if (open.title === "delete-unassign") {
            const payload = {
                id: open.info._id,
                semi_id: open?.id,
            };
            unassignSemiCategoryToMainCategory(payload);
        }
    };
    return (
        <>
            {open.modalDialog && (
                <ModalDialog
                    open={open}
                    setOpen={setOpen}
                    title={"האם את/ה בטוח ?"}
                    onClick={submitHandler}
                />
            )}
            {open.popUp && (
                <PopUp setOpen={setOpen} open={open}>
                    <Form
                        open={open}
                        setOpen={setOpen}
                        refetch={refetch}
                    />
                </PopUp>
            )}
        </>
    );
};

