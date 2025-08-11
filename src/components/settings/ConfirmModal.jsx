import { useEffect, useRef } from "react";

const ConfirmModal = (props) => {
    const {
        isOpen,
        onConfirm,
        onCancel,
        title,
        message,
        confirmLabel = "Confirm",
        isLoading = false,
    } = props;

    const cancelRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e) => {
            if (e.key === "Escape") onCancel?.();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isOpen, onCancel]);

    useEffect(() => {
        if (isOpen) cancelRef.current?.focus();
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirmModalLabel"
            aria-describedby="confirmModalDesc"
            onClick={onCancel}>
            <div
                className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md"
                onClick={(e) => e.stopPropagation()}>
                <h3
                    className="text-lg font-semibold mb-4"
                    id="confirmModalLabel">
                    {title ?? "Are you sure?"}
                </h3>
                <p
                    className="text-sm text-neutral600 mb-6"
                    id="confirmModalDesc">
                    {message ??
                        "Do you really want to proceed with this action?"}
                </p>
                <div className="flex justify-end space-x-4">
                    <button
                        ref={cancelRef}
                        type="button"
                        className="btn btn-secondary"
                        onClick={onCancel}
                        disabled={isLoading}>
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={onConfirm}
                        disabled={isLoading}>
                        {isLoading ? "Working..." : confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
