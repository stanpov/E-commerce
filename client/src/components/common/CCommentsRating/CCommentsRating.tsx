import React from 'react';
import { CLable } from '../CLable/CLable';
import { CComment } from '../CComment/CComment';
import { useAppSelector } from '../../../Redux/hooks';
import { currentProductRating } from '../../../Redux/CurrentProduct/CurrentProductSlice';
import { Rating } from '../../../interfaces/interfaces';
import { CAddStarsRadios } from '../CAddStarsRadios/CAddStarsRadios';
import { getUserId } from '../../../Redux/Auth/AuthSlice';
import { CNoCommentsMessage } from '../CNoCommentsMessage/CNoCommentsMessage';
import './CCommentsRating.scss';

interface CCommentsRatingProps { }

export const CCommentsRating: React.FC<CCommentsRatingProps> = () => {
    const id = useAppSelector(getUserId)
    const commentsAndRating = useAppSelector(currentProductRating);
    let comments = [...commentsAndRating].filter(x => x.comment !== '' && x.comment !== undefined);

    const commentRatingSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let comment = formData.get('comment');
        let starsCount = Number(formData.get('star'));

        console.log(comment);
        console.log(starsCount);
        console.log(id.length);

    }

    return (
        <section className='rating__section'>
            {
                comments.length > 0
                    ? <article className='rating__section__comments__grid'>
                        {
                            comments.map((x: Rating) => x.comment ? <CComment key={Math.random()} product={x} /> : null)
                        }
                    </article>
                    : <article className='rating__section__comments__flex'>
                        <CNoCommentsMessage />
                    </article>
            }
            <article className='rating__section__form'>
                <form onSubmit={commentRatingSubmitHandler}>
                    <CLable inputId={'comment'} title={'Add Comment & Rating'} />
                    <textarea name="comment" id="comment" maxLength={25} ></textarea>
                    <h4>rate our product here</h4>
                    <CAddStarsRadios />
                    <input type="submit" value={'Send'} />
                </form>
            </article>
        </section>
    )
}
