import { FC } from 'react'
import { ProfileForm } from './profile-form'
import { ProfileLayout } from './profile-layout'

export const Profile: FC = () => {
    return (
        <ProfileLayout>
            <ProfileForm />
        </ProfileLayout>
    )
}
