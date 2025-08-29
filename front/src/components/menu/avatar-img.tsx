import { IUser } from "@/interfaces/IUser"
import { AvatarFallback } from "@radix-ui/react-avatar"

interface IAvatarImprovisedImgProps {
  data: IUser | null | undefined
}

const AvatarImprovisedImg = ({data}: IAvatarImprovisedImgProps) => {
  return (
    <AvatarFallback className="text-xs">
      {data?.first_name?.split(" ")[0]?.[0]}
      {data?.last_name?.split(" ")[0]?.[0]}
    </AvatarFallback>
  )
}

export { AvatarImprovisedImg }