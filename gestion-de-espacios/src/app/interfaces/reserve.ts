import { User } from "./user"
import { Space } from "./space"

export interface Reserve {
  id: string
  spaceId: number
  name: string
  userId: number
  date: string
  status: boolean
  description: string
  user: User
  workSpace: Space

}
