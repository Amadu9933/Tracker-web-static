import React from 'react';
import { TermsModal } from './ReusableModal';

interface TermsAndConditionsProps {
  terms: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({
  terms,
  onToggle,
  onClose,
}) => (
  <TermsModal>
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 px-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white shadow-2xl max-h-[82vh] overflow-y-auto">
        <div className="border-b border-slate-200 bg-gradient-to-r from-orange-50 to-white px-6 py-5 md:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-600">
            legal agreement
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-900 md:text-2xl">
            Terms & Conditions
          </h2>
        </div>

        <div className="space-y-5 px-6 py-6 text-sm leading-7 text-slate-700 md:px-8">
          <p>
            Trackerr is a real-time parcel tracking platform designed to provide
            visibility for business owners managing their logistics operations.
          </p>

          <p>
            Business owners onboard and manage their own riders. Trackerr does not
            employ, compensate, or supervise riders, as they are independently
            owned and managed by their respective vendors.
          </p>

          <p>
            Trackerr is not liable for the safety, loss, delay, or damage of any
            parcel during transit or delivery. Responsibility for parcel handling,
            dispatch, and final delivery remains with the logistics owner and their
            riders.
          </p>

          <p>
            Deposits made on Trackerr are strictly non-withdrawable and
            non-refundable, unless otherwise stated in a written agreement or as
            required by law.
          </p>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="mb-2 text-base font-semibold text-slate-900">
              Privacy Policy
            </h3>
            <p>
              Trackerr respects your privacy and only collects information
              necessary to provide and improve its services. Your data is not
              shared with third parties without consent, except where required by
              law or necessary for the operation of approved service features.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-orange-50 p-4">
            <h3 className="mb-2 text-base font-semibold text-slate-900">
              Acceptance of Terms
            </h3>
            <p>
              By continuing to use Trackerr, you confirm that you have read,
              understood, and agree to these terms and conditions.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-200 bg-slate-50 px-6 py-5 md:px-8">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              className="mt-1 h-5 w-5 accent-orange-500 rounded"
              onChange={onToggle}
              checked={terms}
            />
            <label className="text-sm text-slate-700 md:text-base">
              I have read and accept the Terms & Conditions
            </label>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  </TermsModal>
);

export default TermsAndConditions;

///usage
//{showTermsModal && (
       // <TermsAndConditions
        //  terms={terms}
         // onToggle={handlesetTerms}
         // onClose={() => setShowTermsModal(false)}
       // />
      //)}
    