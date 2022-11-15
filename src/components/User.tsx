import { User } from '@/interfaces'

type UserProps = {
  user: User
}

function UserComponent({ user }: UserProps) {
  return (
    <li>
      {user.id}
      {user.name}
      {user.email}
    </li>
  )
}

export default UserComponent
