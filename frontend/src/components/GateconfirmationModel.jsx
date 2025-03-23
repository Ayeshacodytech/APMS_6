import React from 'react';

function GateConfirmationModal({ isOpen, onClose, onConfirm, topic }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-medium text-gray-900">Confirm Deletion</h2>
                <p className="mt-2 text-sm text-gray-600">
                    Are you sure you want to delete "{topic}"?
                </p>
                <div className="mt-4 flex justify-end gap-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md text-sm">
                        Cancel
                    </button>
                    <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded-md text-sm">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default GateConfirmationModal;

