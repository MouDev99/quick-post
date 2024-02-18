import SuggestedUserCard from "./suggested-user-card";


export default function WhoToFollow() {


  return (
    <div className="mt-2 pb-2 border rounded-2xl w-full h-fit bg-[#f7f9f9]">
      <h2 className="text-[#0f1419] text-xl font-bold m-3">Who to follow</h2>
      {[1, 2, 3, 4, 5].map(user => {
        return <SuggestedUserCard key={user} />
      })}
    </div>
  )
}
