export default function ReusableModal({children}: any) {
  return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            {children}
        </div>
  )
}