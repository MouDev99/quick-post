export default function Spinner({styles}: {styles: string}) {
  return (
    <div className={styles + " border-white border-b-[#3A98EB] rounded-full mx-auto animate-spin"}>
    </div>
  )
}
