import { FC } from 'react'
import { ProfileLayout } from '../profile/profile-layout'

export const Orders: FC = () => {
    return (
        <ProfileLayout>
            <div>
                <h2 className='text text_type_main-medium'>Cписок заказов</h2>
            </div>
        </ProfileLayout>
    )
}
