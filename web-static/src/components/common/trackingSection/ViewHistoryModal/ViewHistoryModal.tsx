import Modal from '@mui/material/Modal';
import { useState } from 'react';

export default function BasicModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button
        onClick={handleOpen}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Open modal
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 w-96 -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-black shadow-xl p-8 rounded-lg">
          <h2 id="modal-modal-title" className="text-xl font-semibold mb-2">
            Did You Know?
          </h2>
          <p id="modal-modal-description" className="mt-2 text-gray-700">
            Trackerr supports tracking parcels from other logistics partners like DHL, GIG, and more. Simply enter your parcel ID and press Enter to get real-time updates.
          </p>
        </div>
      </Modal>
    </div>
  );
}
