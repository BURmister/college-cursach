import { FC, Children, cloneElement, useState, useEffect } from 'react';
import styles from './Carousel.module.scss';

type CarouselProps = {
   children: any;
};

const Carousel: FC<CarouselProps> = ({ children }) => {
   const pageWidth = 100

   const [pages, setPages] = useState<any>([]);
   const [offset, setOffset] = useState<number>(0);

   useEffect(() => {
      setPages(
         Children.map(children, (child: any) => {
            return cloneElement(child, {});
         }),
      );
   }, []);

   const handleLeftClick = () => {
      setOffset((currentOffset) => {
         const newOffset = currentOffset + pageWidth;
         return Math.min(newOffset, 0);
      });
   };

   const handleRightClick = () => {
      setOffset((currentOffset) => {
         const newOffset = currentOffset - pageWidth;
         const maxOffset = -(pageWidth * (pages.length - 1));
         return Math.max(newOffset, maxOffset);
      });
   };

   return (
      <div className={styles.container}>
         <div className={styles.window}>
            <div
               className={styles.allPagesContainer}
               style={{
                  transform: `translateX(${offset}px)`,
               }}>
               {pages.map((item:any) => (
                  <div className={styles.page}>{item}</div>
               ))}
            </div>
         </div>
         <div className="gallery__buttons">
            <div onClick={handleLeftClick} className="gallery__button-back prev">
               <button className="button gallery_button_back prev" type="button">
                  {' '}
                  назад{' '}
               </button>
            </div>
            <div onClick={handleRightClick} className="gallery__button-next next">
               <button className="button gallery_button_next next" type="button">
                  {' '}
                  вперед{' '}
               </button>
            </div>
         </div>
      </div>
   );
};

export default Carousel;
