var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const app = express(); // Khởi tạo biến `app` với express


var indexRouter = require('./routes/index');
var publishersRouter = require('./routes/publishers');
var booksRouter = require('./routes/books');
var categoriesRouter = require('./routes/category');
var customersRouter = require('./routes/customer');
var ordersRouter = require('./routes/orders');
var orderItemsRouter = require('./routes/orderItems');
var adminRouter = require('./routes/admin');
const reviewsRouter = require('./routes/reviews');
const favoriteBooksRoute = require('./routes/favoriteBooks');
// khai báo cor
const cors = require('cors');
const PORT = process.env.PORT || 3200;


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware để phục vụ tệp tin tĩnh từ các thư mục uploads
app.use('/uploads/admins', express.static(path.join(__dirname, 'uploads/admins')));
app.use('/uploads/categories', express.static(path.join(__dirname, 'uploads/categories')));
app.use('/uploads/books', express.static(path.join(__dirname, 'uploads/books')));
app.use('/uploads/publishers', express.static(path.join(__dirname, 'uploads/publishers'))); // Đường dẫn cho publishers
// Middleware để cấu hình CORS

app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET, POST, PUT, DELETE,PATCH, OPTIONS', // Đảm bảo thêm OPTIONS
  allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control'] // Thêm 'Cache-Control'
}))
app.options('*', cors());

//kết nối db
const connection = mongoose.connect('mongodb://localhost:27017/DATN', {})
    .then(() => {
        console.log('>>>>>>> DB đã kết nối thành công!!!!');
    })
    .catch(err => {
        console.error('>>>>>>>> DB error: ', err);
    });

app.use('/', indexRouter);
app.use('/books',booksRouter);
app.use('/categories',categoriesRouter);
app.use('/customers',customersRouter);
app.use('/publishers', publishersRouter); 
app.use('/orders',ordersRouter);
app.use('/admins', adminRouter);
app.use('/reviews', reviewsRouter);
app.use('/favoriteBooks', favoriteBooksRoute);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}/books/`);
  console.log(`http://localhost:${PORT}/books/getAllvisible`);
  console.log(`http://localhost:${PORT}/books/hot`);
  console.log(`http://localhost:${PORT}/books/new`);
  console.log(`http://localhost:${PORT}/books/featured`);
  console.log(`http://localhost:${PORT}/books/66d57256afc8a51793d73227`);
  console.log(`http://localhost:${PORT}/books/category/66e52d1113ae0384d3444c40`);
  console.log(`http://localhost:${PORT}/books/author/Nhiều%20Tác%20Giả`);
  console.log(`http://localhost:${PORT}/books/title/:title, với :title là tên sách cần tìm`);
  console.log(`http://localhost:${PORT}/books/sortedByPrice?sortOrder=asc`);
  console.log(`http://localhost:${PORT}/books/sortedByPrice?sortOrder=desc`);

  console.log(`http://localhost:${PORT}/categories`);
  console.log(`http://localhost:${PORT}/categories/66d5672aafc8a51793d731ce`);

  console.log(`http://localhost:${PORT}/admins/register`);
  console.log(`http://localhost:${PORT}/admins/login`);
  console.log(`http://localhost:${PORT}/admins`);
  console.log(`http://localhost:${PORT}/admins`);
  console.log(`http://localhost:${PORT}/admins`);
  console.log(`http://localhost:${PORT}/admins/update/67092bf9461bcc185950c10f`);

  console.log(`http://localhost:${PORT}/uploads/books/1728314210371-331872765.webp`);
  console.log(`http://localhost:${PORT}/uploads/categories/1727923378988-394065473.webp`);

  console.log(`http://localhost:${PORT}/customers/register`);
  console.log(`http://localhost:${PORT}/customers/login`);
  console.log(`http://localhost:${PORT}/customers`);
  console.log(`http://localhost:${PORT}/customers/6707f3aee55fb28d5793988f`);
  console.log(`http://localhost:${PORT}/customers/status/6707f3aee55fb28d5793988f`);

  console.log(`http://localhost:${PORT}/orders`);
  console.log(`http://localhost:${PORT}/orders/filter-by-customer/67286e8c684247600f9a8f48`);
  console.log(`http://localhost:${PORT}/orders/filter-by-date/2024-10-23`);
  console.log(`http://localhost:${PORT}/orders/filter-by-address/TP.HCM`);

  console.log(`http://localhost:${PORT}/favoriteBooks/67286e8c684247600f9a8f48`);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// Trong app.js
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

module.exports = app;
