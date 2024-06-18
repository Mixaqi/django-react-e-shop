import { Carousel } from 'react-bootstrap';

const CategoriesSlider = () => {
    return (
        <Carousel>
            <Carousel.Item style={{ height: '300px' }}>
                <img
                    className="d-block w-100"
                    src="https://via.placeholder.com/800x200?text=GPU"
                    alt="GPU"
                />
                <Carousel.Caption>
                    <h3>GPU</h3>
                    <p>Graphics Processing Unit</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item style={{ height: '300px' }}>
                <img
                    className="d-block w-100"
                    src="https://via.placeholder.com/800x200?text=CPU"
                    alt="CPU"
                />
                <Carousel.Caption>
                    <h3>CPU</h3>
                    <p>Central Processing Unit</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item style={{ height: '300px' }}>
                <img
                    className="d-block w-100"
                    src="https://via.placeholder.com/800x200?text=RAM"
                    alt="RAM"
                />
                <Carousel.Caption>
                    <h3>RAM</h3>
                    <p>Random Access Memory</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

export default CategoriesSlider;
