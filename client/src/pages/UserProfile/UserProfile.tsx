import React, { useState } from 'react';
import './UserProfile.scss';
import { PageWrapper } from '../../components/common/PageWrapper/PageWrapper';
import { Link } from 'react-router-dom';
import { UserProfileInformation } from '../../components/UserProfileInformation/UserProfileInformation';
import { UserProfileUpdate } from '../../components/UserProfileUpdate/UserProfileUpdate';

interface UserProfileProps {

}

export const UserProfile: React.FC<UserProfileProps> = () => {

    const [isUpdate, setIsUpdate] = useState(false);

    return (
        <section className='profile'>
            <PageWrapper>
                {
                    !isUpdate
                        ? <UserProfileInformation
                            setIsUpdate={setIsUpdate}
                        />
                        : <UserProfileUpdate
                            setIsUpdate={setIsUpdate}
                        />
                }

            </PageWrapper>
        </section>
    )
}

