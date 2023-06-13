import { ModalDialog } from "~/components/ui/ModalDialog";
import { PopUp } from "~/components/ui/PopUp";
import { Form } from "./Form";
import { useDeleteSemiCategory } from "~/hooks/useSemiCategory";

export const Actions = ({ setOpen, open, refetch }) => {

    const { mutate: deleteMutateSemiCategory } = useDeleteSemiCategory(setOpen, open, refetch);

    return (
        <>
            {open.modalDialog && (
                <ModalDialog
                    open={open}
                    setOpen={setOpen}
                    title={"האם את/ה בטוח ?"}
                    onClick={() => deleteMutateSemiCategory(open.id)}
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

