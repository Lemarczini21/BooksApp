{
  ('use strict');

  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
      filterForm: '.filters',
    },
    book: {
      image: '.books-list .book__image',
    },
  };
  const favoriteClass = {
    favorite: 'favorite',
  };
  const templates = {
    books: Handlebars.compile(
      document.querySelector(select.templateOf.book).innerHTML
    ),
  };

  class BooksList {
    constructor() {
      const thisBooksList = this;

      thisBooksList.filters = [];
      thisBooksList.favoriteBooks = [];

      thisBooksList.initData();
      thisBooksList.render();
      thisBooksList.getElements();
      thisBooksList.initActions();
      thisBooksList.determineRatingBgc();
    }

    initData() {
      this.data = dataSource.books;
    }

    render() {
      const thisBooksList = this;

      for (const book of dataSource.books) {
        const ratingBgc = thisBooksList.determineRatingBgc(book.rating);
        const ratingWidth = book.rating * 10;
        book.ratingBgc = ratingBgc;
        book.ratingWidth = ratingWidth;
        const generatedHTML = templates.books(book);
        const generatedDOMElement = utils.createDOMFromHTML(generatedHTML);
        const booksContainer = document.querySelector(
          select.containerOf.booksList
        );
        booksContainer.appendChild(generatedDOMElement);
      }
    }
    getElements() {
      const thisBooksList = this;

      thisBooksList.container = document.querySelector(
        select.containerOf.booksList
      );
      thisBooksList.filterForm = document.querySelector(
        select.containerOf.filterForm
      );
    }

    initActions() {
      const thisBooksList = this;

      thisBooksList.container.addEventListener('dblclick', function (event) {
        event.preventDefault(event);
        const bookClick = event.target;
        if (bookClick.offsetParent.classList.contains('book__image')) {
          const bookId = bookClick.offsetParent.getAttribute('data-id');
          if (!thisBooksList.favoriteBooks.includes(bookId)) {
            bookClick.offsetParent.classList.add(favoriteClass.favorite);
            thisBooksList.favoriteBooks.push(bookId);
          } else {
            bookClick.offsetParent.classList.remove(favoriteClass.favorite);
            const bookIndex = thisBooksList.favoriteBooks.indexOf(bookId);
            thisBooksList.favoriteBooks.splice(bookIndex, 1);
          }
        }
      });

      thisBooksList.filterForm.addEventListener('click', function (event) {
        const booksFilter = event.target;
        if (
          booksFilter.tagName == 'INPUT' &&
          booksFilter.name == 'filter' &&
          booksFilter.type == 'checkbox'
        ) {
          const filterValue = booksFilter.value;
          console.log(filterValue);
          if (booksFilter.checked == true) {
            thisBooksList.filters.push(filterValue);
          } else {
            const checkedValue = thisBooksList.filters.indexOf(filterValue);
            thisBooksList.filters.splice(checkedValue, 1);
          }
          console.log('filters:', thisBooksList.filters);
        }
        thisBooksList.filterBooks(thisBooksList.filters);
      });
    }

    filterBooks(filters) {
      for (const book of dataSource.books) {
        let shouldBeHidden = false;

        for (const filter of filters) {
          if (!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }
        const selectImage = document.querySelector(
          '.book__image[data-id="' + book.id + '"]'
        );
        if (shouldBeHidden) {
          selectImage.classList.add('hidden');
        } else {
          selectImage.classList.remove('hidden');
        }
        console.log(selectImage);
      }
    }

    determineRatingBgc(rating) {
      const thisBooksList = this;
      thisBooksList.ratingBgc = '';
      if (rating < 6) {
        thisBooksList.ratingBgc =
          'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%';
      } else if (rating > 6 && rating <= 8) {
        thisBooksList.ratingBgc =
          'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%';
      } else if (rating > 8 && rating <= 9) {
        thisBooksList.ratingBgc =
          'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%';
      } else if (rating > 9) {
        thisBooksList.ratingBgc =
          'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%';
      }
      return thisBooksList.ratingBgc;
    }
  }

  const app = new BooksList();
  console.log(app);
}
// {
//   ('use strict');

//   const select = {
//     templateOf: {
//       book: '#template-book',
//     },
//     containerOf: {
//       booksList: '.books-list',
//       filterForm: '.filters',
//     },
//     book: {
//       image: '.books-list .book__image',
//     },
//   };
//   const favoriteClass = {
//     favorite: 'favorite',
//   };
//   const templates = {
//     books: Handlebars.compile(
//       document.querySelector(select.templateOf.book).innerHTML
//     ),
//   };

//   function render() {
//     for (let book of dataSource.books) {
//       const ratingBgc = determineRatingBgc(book.rating);
//       const ratingWidth = ratingBgc * 10;
//       book.ratingBgc = ratingBgc;
//       book.ratingWidth = ratingWidth;
//       const generatedHTML = templates.books(book);
//       const generatedDOMElement = utils.createDOMFromHTML(generatedHTML);
//       const booksContainer = document.querySelector(
//         select.containerOf.booksList
//       );
//       booksContainer.appendChild(generatedDOMElement);
//     }
//   }

//   const favoriteBooks = [];

//   function initActions() {
//     const bookList = document.querySelector(select.containerOf.booksList);
//     bookList.addEventListener('dblclick', function (event) {
//       event.preventDefault(event);
//       const bookClick = event.target;
//       if (bookClick.offsetParent.classList.contains('book__image')) {
//         const bookId = bookClick.offsetParent.getAttribute('data-id');
//         if (!favoriteBooks.includes(bookId)) {
//           bookClick.offsetParent.classList.add(favoriteClass.favorite);
//           favoriteBooks.push(bookId);
//         } else {
//           bookClick.offsetParent.classList.remove(favoriteClass.favorite);
//           const bookIndex = favoriteBooks.indexOf(bookId);
//           favoriteBooks.splice(bookIndex, 1);
//         }
//       }
//     });

//     filterForm.addEventListener('click', function (event) {
//       const booksFilter = event.target;
//       if (
//         booksFilter.tagName == 'INPUT' &&
//         booksFilter.name == 'filter' &&
//         booksFilter.type == 'checkbox'
//       ) {
//         const filterValue = booksFilter.value;
//         console.log(filterValue);
//         if (booksFilter.checked == true) {
//           filters.push(filterValue);
//         } else {
//           const checkedValue = filters.indexOf(filterValue);
//           filters.splice(checkedValue, 1);
//         }
//         console.log('filters:', filters);
//       }
//       filterBooks();
//     });
//   }

//   const filters = [];
//   const filterForm = document.querySelector(select.containerOf.filterForm);

//   function filterBooks() {
//     for (const book of dataSource.books) {
//       let shouldBeHidden = false;
//       const selectImage = document.querySelector(
//         '.book__image[data-id="' + book.id + '"]'
//       );
//       for (const filter of filters) {
//         if (!book.details[filter]) shouldBeHidden = true;
//         break;
//       }
//       if (shouldBeHidden) {
//         selectImage.classList.add('hidden');
//       } else {
//         selectImage.classList.remove('hidden');
//       }
//       console.log(selectImage);
//     }
//   }
//   function determineRatingBgc(rating) {
//     let ratingBgc = '';
//     if (rating < 6) {
//       ratingBgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%';
//     } else if (rating > 6 && rating <= 8) {
//       ratingBgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%';
//     } else if (rating > 8 && rating <= 9) {
//       ratingBgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%';
//     } else if (rating > 9) {
//       ratingBgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%';
//     }
//     return ratingBgc;
//   }
//   render();
//   initActions();
//   determineRatingBgc();
// }
