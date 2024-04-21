import Pagination from 'components/Pagination';
import React from 'react'

const Products = () => {
   const items = Array.from({ length: 100 }, (_, index) => `${index + 1}`);

   return (
     <div>
       <Pagination itemsPerPage={10} items={items} />
     </div>
   );
}

export default Products