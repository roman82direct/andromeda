import { useSelector, useDispatch } from "@/app/providers/store/store";
import { closeModal } from "@/entities/product/model/slice/modalSlice";
import { Modal } from "../modal/modal";

export const ModalRoot = () => {
    const dispatch = useDispatch();
    const activeModal = useSelector(state => state.modal.activeModal);

    const handleCloseModal = () => {
        dispatch(closeModal());
    }
    // на данный момент использование компонента modal такое. Далее заменить на отдельные компоненты врапперы для каждой модалки, чтобы там уже была своя логика и контент.
    return (
        <div>
            {activeModal === "login" && <Modal title="Логин" onClose={handleCloseModal}>Login Modal Content</Modal>}
            {activeModal === "filters" && <Modal title="Фильтры" onClose={handleCloseModal}>Filters Modal Content</Modal>}
            {activeModal === "address" && <Modal title="Добавить адрес" onClose={handleCloseModal}>Address Modal Content</Modal>}
        </div>
    );
}