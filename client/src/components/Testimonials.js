import { useState, useEffect } from 'react'
import '../styles/testimonials.css'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
const data = [
    {
        id: 1,
        image:
            "images/woman1.jpg",
        name: 'maria ferguson',
        title: 'office manager',
    },
    {
        id: 2,
        image:
            'https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883417/person-3_ipa0mj.jpg',
        name: 'john doe',
        title: 'regular guy',
    },
    {
        id: 3,
        image:
            'https://res.cloudinary.com/diqqf3eq2/image/upload/v1595959121/person-1_aufeoq.jpg',
        name: 'peter smith',
        title: 'product designer',
    },
    {
        id: 4,
        image:
            'images/john.webp',
        name: 'Jack Handerson',
        title: 'the boss',
    },
];


function Slider() {
    const [people, setPeople] = useState(data)
    const [currentIndex, setIndex] = useState(0)

    // !=== making sure that the index does not go beyond the length of the array
    useEffect(() => {
        const lastIndex = people.length - 1
        if (currentIndex > lastIndex) setIndex(0)
        else if (currentIndex < 0) setIndex(lastIndex)
    }, [currentIndex, people])


    // ! === making the slider move automatically to the next person every 5 seconds

    useEffect(() => {
        let interval = setInterval(() => setIndex(currentIndex + 1), 4000)
        return () => clearInterval(interval)
    }, [currentIndex])

    return (
        <section className='testimonials'>
            <h1 className="title">
                Customer Testimonial
            </h1>
            <div className="reviews">
                {
                    people.map((person, index) => {
                        const { name, id, title, image } = person;

                        // !targetting what is current review and what is the next and the previous
                        let className = 'review'
                        if (index === currentIndex) {
                            className += ' current'
                        } else if (index === currentIndex - 1 ||
                            (currentIndex === 0 && index === people.length - 1)) {
                            className += ' previous'
                        } else if (index === currentIndex + 1 ||
                            (currentIndex === people.length - 1 && index === 0)) {
                            className += ' next'
                        }

                        return (
                            <div className={className} key={id}>
                                <p className="review-quote">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod voluptate dolore eos aliquam saepe? Labore necessitatibus exercitationem hic ad perferendis!</p>
                                <div className="author">
                                    <img src={image} alt={title} className='review-image' />
                                    <div>
                                        <h4 className="review-name">
                                            {name}
                                        </h4>
                                        <p className="review-title">
                                            {title}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                <button onClick={() => setIndex(currentIndex - 1)} className='previous-button'>
                    <FaChevronLeft />
                </button>
                <button onClick={() => setIndex(currentIndex + 1)} className='next-button'>
                    <FaChevronRight />
                </button>
            </div>
        </section>
    );
}

export default Slider;
