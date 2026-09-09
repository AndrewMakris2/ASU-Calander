// Seed data: Teegan's ASU Canvas assignments (Fall 2026 C-term), pulled from her Canvas "To Do" list on 2026-09-09.
// Announcements and recurring "Extra Credit" calendar events were left out — they carry no points/due-date and
// don't fit the assignment shape below.

const COURSES = [
  'MAE 241',
  'MAE 384',
  'MAE 213',
  'MAE 242',
  'Entrepreneurship & Value Creation',
];

const COURSE_LABELS = {
  'MAE 241': 'MAE 241: Intro to Thermodynamics',
  'MAE 384': 'MAE 384: Adv Math Methods for Engineers',
  'MAE 213': 'MAE 213: Mechanics of Materials IP',
  'MAE 242': 'MAE 242: Intro to Fluid Mechanics',
  'Entrepreneurship & Value Creation': 'Entrepreneurship & Value Creation',
};

const CANVAS_BASE = {
  'MAE 241': 'https://canvas.asu.edu/courses/269185',
  'MAE 384': 'https://canvas.asu.edu/courses/267343',
  'MAE 213': 'https://canvas.asu.edu/courses/271969',
  'MAE 242': 'https://canvas.asu.edu/courses/273312',
  'Entrepreneurship & Value Creation': 'https://canvas.asu.edu/courses/262768',
};

function seed(n, name, course, points, dueDate, dueTime, path) {
  return {
    id: 'seed-' + n,
    name,
    course,
    points,
    dueDate,
    dueTime,
    url: path ? CANVAS_BASE[course] + '/' + path : '',
  };
}

const SEED_ASSIGNMENTS = [
  // Sep 9
  seed(1, 'Ch. 3 – Quiz 3', 'MAE 241', 5, '2026-09-09', '23:59', 'assignments/7666982'),
  seed(2, 'Ch. 3: Ideal Gases — Part 1 (9:41)', 'MAE 241', 1, '2026-09-09', '23:59', 'assignments/7666983'),
  seed(3, 'Ch. 3: Ideal Gases — Part 2 (10:37)', 'MAE 241', 1, '2026-09-09', '23:59', 'assignments/7666985'),

  // Sep 10
  seed(4, 'Connect HW 2 (Ch 2 and 3)', 'MAE 241', 15, '2026-09-10', '23:59', 'assignments/7865881'),
  seed(5, 'Lecture 3.1: Solving Non-linear Equations Overview (7:21)', 'MAE 384', 5, '2026-09-10', '07:30', 'assignments/7613259'),
  seed(6, 'Lecture 3.2: Tolerances and Relative Errors (9:18)', 'MAE 384', 5, '2026-09-10', '07:30', 'assignments/7613260'),
  seed(7, 'Lecture 3.3: Bisection Method (22:06)', 'MAE 384', 5, '2026-09-10', '07:30', 'assignments/7613261'),
  seed(8, 'Class 06: Videos 3.1-3.3', 'MAE 384', 5, '2026-09-10', '07:35', 'quizzes/2077851'),
  seed(9, 'Recitation R3.1: Bisection Method (21:02)', 'MAE 384', 5, '2026-09-10', '23:59', 'assignments/7613367'),
  seed(10, 'Recitation R3.2 - Matlab Grader', 'MAE 384', 5, '2026-09-10', '23:59', 'assignments/7613368'),
  seed(11, 'Recitation R3.2: Coding Bisection Method (29:21)', 'MAE 384', 5, '2026-09-10', '23:59', 'assignments/7613369'),

  // Sep 12
  seed(12, 'Homework 2-MAE213-F26', 'MAE 213', 100, '2026-09-12', '23:59', 'assignments/7870834'),

  // Sep 13
  seed(13, 'Module 2 - Methods Assignment: Media Reflection Forum', 'Entrepreneurship & Value Creation', 20, '2026-09-13', '23:59', 'discussion_topics/7666978'),
  seed(14, 'Module 2 - Venture Assignment: EBPD - Featuring Problem/Opportunity Slide Draft', 'Entrepreneurship & Value Creation', 10, '2026-09-13', '23:59', 'assignments/7495921'),
  seed(15, 'Module 2 - Market Assignment: Meet Me and My Peeps Discussion', 'Entrepreneurship & Value Creation', 10, '2026-09-13', '23:59', 'discussion_topics/7775262'),
  seed(16, 'Module 2 Lecture Curiosity (18:33)', 'Entrepreneurship & Value Creation', 20, '2026-09-13', '23:59', 'assignments/7663069'),
  seed(17, 'Read sections 2.1 and 2.2', 'MAE 213', 0, '2026-09-13', '23:59', 'assignments/7873726'),
  seed(18, 'Lecture 3.1: Normal and Shear Strains (14:43)', 'MAE 213', 10, '2026-09-13', '23:59', 'assignments/7759637'),
  seed(19, 'Lecture 3.2: Generalized Concepts of Normal and Shear Strains (15:41)', 'MAE 213', 10, '2026-09-13', '23:59', 'assignments/7759638'),
  seed(20, 'Lecture 3.4: Geometric Considerations for Structures (14:18)', 'MAE 213', 10, '2026-09-13', '23:59', 'assignments/7759639'),

  // Sep 14
  seed(21, 'Ch 4 - Quiz 1', 'MAE 241', 5, '2026-09-14', '23:59', 'assignments/7666945'),
  seed(22, 'Ch. 4: Energy Balance for Closed Systems (25:06)', 'MAE 241', 1, '2026-09-14', '23:59', 'assignments/7666993'),
  seed(23, 'Ch. 4: Moving Boundary Work (17:57)', 'MAE 241', 1, '2026-09-14', '23:59', 'assignments/7666997'),

  // Sep 15
  seed(24, 'Guided Practice HW 03', 'MAE 241', 6, '2026-09-15', '23:59', 'assignments/7865581'),
  seed(25, 'Lecture 3.4: Newton-Raphson Method (18:24)', 'MAE 384', 5, '2026-09-15', '07:30', 'assignments/7613262'),
  seed(26, 'Lecture 3.5: Secant Method (12:42)', 'MAE 384', 5, '2026-09-15', '07:30', 'assignments/7613263'),
  seed(27, 'Lecture 3.6: Strategy for Solving a Non-Linear Equation (2:47)', 'MAE 384', 5, '2026-09-15', '07:30', 'assignments/7613265'),
  seed(28, 'Lecture 3.7: Solving Systems of Non-Linear Equations (35:25)', 'MAE 384', 5, '2026-09-15', '07:30', 'assignments/7613266'),
  seed(29, 'Class 07: Videos 3.4-3.7', 'MAE 384', 5, '2026-09-15', '07:35', 'quizzes/2077848'),
  seed(30, 'Midterm 1 (Summer 2026)', 'MAE 384', 0, '2026-09-15', '23:59', 'quizzes/2065514'),
  seed(31, "Recitation R3.3: Newton-Raphson Method (13:29)", 'MAE 384', 5, '2026-09-15', '23:59', 'assignments/7613370'),
  seed(32, 'Recitation R3.4: Secant Method (12:53)', 'MAE 384', 5, '2026-09-15', '23:59', 'assignments/7613371'),

  // Sep 16
  seed(33, 'Ch 4 - Quiz 2', 'MAE 241', 5, '2026-09-16', '23:59', 'assignments/7666946'),
  seed(34, 'Ch. 4: Internal Energy, Enthalpy and Specific Heats of Ideal Gases (Part 1) (15:36)', 'MAE 241', 1, '2026-09-16', '23:59', 'assignments/7666994'),
  seed(35, 'Ch. 4: Internal Energy, Enthalpy and Specific Heats of Ideal Gases (Part 2) (19:08)', 'MAE 241', 1, '2026-09-16', '23:59', 'assignments/7666995'),
  seed(36, 'Ch. 4: Internal Energy, Enthalpy and Specific Heats of Solids and Liquids (14:37)', 'MAE 241', 1, '2026-09-16', '23:59', 'assignments/7666996'),
  seed(37, 'Ch. 4: Specific Heats (9:37)', 'MAE 241', 1, '2026-09-16', '23:59', 'assignments/7666998'),

  // Sep 17
  seed(38, 'Lecture 4.1: Curve Fitting and Interpolation Overview (3:34)', 'MAE 384', 5, '2026-09-17', '07:30', 'assignments/7613267'),
  seed(39, 'Lecture 4.2: Linear Least Squares Regression (20:51)', 'MAE 384', 5, '2026-09-17', '07:30', 'assignments/7613268'),
  seed(40, 'Class 08: Videos 4.1-4.2', 'MAE 384', 5, '2026-09-17', '07:35', 'quizzes/2077837'),
  seed(41, 'Recitation R4.1 - Matlab Grader', 'MAE 384', 5, '2026-09-17', '23:59', 'assignments/7613374'),
  seed(42, 'Recitation R4.1: Coding Linear Least Squares Regression (16:42)', 'MAE 384', 5, '2026-09-17', '23:59', 'assignments/7613375'),

  // Sep 20
  seed(43, 'Module 2 - Market Assignment: Identify 6 marketplace conversation targets', 'Entrepreneurship & Value Creation', 10, '2026-09-20', '23:59', 'assignments/7495918'),
  seed(44, 'Module 2 - OPTIONAL Extra Credit', 'Entrepreneurship & Value Creation', 0, '2026-09-20', '23:59', 'assignments/7495920'),
  seed(45, 'Module 2 - Venture Assignment: Insight-based solution guesses and solution sketches', 'Entrepreneurship & Value Creation', 10, '2026-09-20', '23:59', 'assignments/7495922'),
  seed(46, 'Module 2 - OPTIONAL Participation Assignment (Submit 5 Total)', 'Entrepreneurship & Value Creation', 0, '2026-09-20', '23:59', 'assignments/7814853'),
  seed(47, 'Homework H3.1', 'MAE 384', 10, '2026-09-20', '23:59', 'quizzes/2065496'),
  seed(48, 'Homework H3.2', 'MAE 384', 10, '2026-09-20', '23:59', 'quizzes/2065507'),
  seed(49, 'Homework H3.3', 'MAE 384', 5, '2026-09-20', '23:59', 'quizzes/2065505'),
  seed(50, 'Homework H3.3 - Problem 2 - Matlab Grader', 'MAE 384', 5, '2026-09-20', '23:59', 'assignments/7651810'),

  // Sep 22
  seed(51, 'Lecture 4.3: Curve Fitting Non-linear Functions Using Least Squares Regression (7:33)', 'MAE 384', 5, '2026-09-22', '07:30', 'assignments/7613269'),
  seed(52, 'Lecture 4.4: Curve Fitting Using Polynomials (21:13)', 'MAE 384', 5, '2026-09-22', '07:30', 'assignments/7613270'),
  seed(53, 'Class 09: Videos 4.3-4.4', 'MAE 384', 5, '2026-09-22', '07:35', 'quizzes/2077847'),
  seed(54, 'Recitation R4.2: Curve Fitting Non-Linear Functions Using Linear Least Squares Regression (18:59)', 'MAE 384', 5, '2026-09-22', '23:59', 'assignments/7613376'),
  seed(55, 'Recitation R4.3 - Matlab Grader', 'MAE 384', 5, '2026-09-22', '23:59', 'assignments/7613377'),
  seed(56, 'Recitation R4.3: Coding Fitting Non-Linear Functions Using Linear Least Squares Regression (16:44)', 'MAE 384', 5, '2026-09-22', '23:59', 'assignments/7613378'),

  // Sep 24
  seed(57, 'Lecture 4.5: Interpolation Using Polynomials (32:18)', 'MAE 384', 5, '2026-09-24', '07:30', 'assignments/7613271'),
  seed(58, 'Lecture 4.6: Interpolation Using Splines (Linear and Quadratic) (15:21)', 'MAE 384', 5, '2026-09-24', '07:30', 'assignments/7613272'),
  seed(59, 'Lecture 4.7: Interpolation Using Cubic Splines (8:50)', 'MAE 384', 5, '2026-09-24', '07:30', 'assignments/7613273'),
  seed(60, 'Lecture 4.8: Cubic Spline Interpolation Code (13:05)', 'MAE 384', 5, '2026-09-24', '07:30', 'assignments/7613274'),
  seed(61, 'Class 10: Videos 4.5-4.8', 'MAE 384', 5, '2026-09-24', '07:35', 'quizzes/2077838'),
  seed(62, 'Recitation R4.4: Writing the Equations to Determine a Cubic Spline (31:45)', 'MAE 384', 5, '2026-09-24', '23:59', 'assignments/7613379'),

  // Sep 27
  seed(63, 'Module 3 - Methods Assignment: Media Reflection Forum', 'Entrepreneurship & Value Creation', 20, '2026-09-27', '23:59', 'discussion_topics/7666979'),
  seed(64, 'Module 3 - Venture Assignment: EBPD - Featuring Solution Sketch Slide Draft', 'Entrepreneurship & Value Creation', 10, '2026-09-27', '23:59', 'assignments/7495926'),
  seed(65, 'Module 3 Lecture - Customer Development - 1 of 2 (19:21)', 'Entrepreneurship & Value Creation', 20, '2026-09-27', '23:59', 'assignments/7664930'),
  seed(66, 'Module 3 Lecture: Customer Development - 2 of 2 (13:10)', 'Entrepreneurship & Value Creation', 20, '2026-09-27', '23:59', 'assignments/7666274'),
  seed(67, 'Homework H4.1', 'MAE 384', 10, '2026-09-27', '23:59', 'quizzes/2065508'),
  seed(68, 'Homework H4.2', 'MAE 384', 10, '2026-09-27', '23:59', 'quizzes/2065503'),
  seed(69, 'Homework H4.3', 'MAE 384', 10, '2026-09-27', '23:59', 'quizzes/2065486'),
  seed(70, 'Homework H4.4', 'MAE 384', 5, '2026-09-27', '23:59', 'quizzes/2065526'),

  // Sep 28
  seed(71, 'Ch 5 - Quiz 1', 'MAE 241', 5, '2026-09-28', '23:59', 'assignments/7666948'),
  seed(72, 'Ch. 5: Conservation of Mass (19:09)', 'MAE 241', 1, '2026-09-28', '23:59', 'assignments/7666999'),
  seed(73, 'Ch. 5: Energy Analysis of Steady-Flow Systems (13:07)', 'MAE 241', 1, '2026-09-28', '23:59', 'assignments/7667000'),
  seed(74, 'Ch. 5: Flow Work and Energy of flowing fluid — Part 1 (5:17)', 'MAE 241', 1, '2026-09-28', '23:59', 'assignments/7667004'),
  seed(75, 'Ch. 5: Flow Work and Energy of flowing fluid — Part 2 (4:25)', 'MAE 241', 1, '2026-09-28', '23:59', 'assignments/7667005'),
  seed(76, 'Ch. 5: Steady Flow Devices: Compressor and Turbine (19:35)', 'MAE 241', 1, '2026-09-28', '23:59', 'assignments/7667006'),
  seed(77, 'Ch. 5: Steady Flow Devices: Nozzle and Diffuser (14:40)', 'MAE 241', 1, '2026-09-28', '23:59', 'assignments/7667008'),

  // Sep 29
  seed(78, 'Midterm Exam 2 - Placeholder', 'MAE 384', 0, '2026-09-29', '08:45', 'assignments/7657633'),

  // Sep 30
  seed(79, 'Ch 5 - Quiz 2', 'MAE 241', 5, '2026-09-30', '23:59', 'assignments/7666949'),
  seed(80, 'Ch. 5: Energy Analysis of Unsteady-flow Processes — Part 1 (8:13)', 'MAE 241', 1, '2026-09-30', '23:59', 'assignments/7667001'),
  seed(81, 'Ch. 5: Energy Analysis of Unsteady-flow Processes — Part 2 (8:40)', 'MAE 241', 1, '2026-09-30', '23:59', 'assignments/7667002'),
  seed(82, 'Ch. 5: Energy Analysis of Unsteady-flow Processes — Part 3 (8:43)', 'MAE 241', 1, '2026-09-30', '23:59', 'assignments/7667003'),
  seed(83, 'Ch. 5: Steady Flow Devices: Heat Exchanger (18:24)', 'MAE 241', 1, '2026-09-30', '23:59', 'assignments/7667007'),
  seed(84, 'Ch. 5: Steady Flow Devices: Pipe and Duct Flow (12:57)', 'MAE 241', 1, '2026-09-30', '23:59', 'assignments/7667009'),
  seed(85, 'Ch. 5: Steady Flow Devices: Throttling Valves (12:00)', 'MAE 241', 1, '2026-09-30', '23:59', 'assignments/7667010'),

  // Oct 1
  seed(86, 'Lecture 5.1: Numerical Differentiation Overview (4:23)', 'MAE 384', 5, '2026-10-01', '07:30', 'assignments/7613275'),
  seed(87, 'Lecture 5.2: Finite Differences - The Link to Calculus (5:35)', 'MAE 384', 5, '2026-10-01', '07:30', 'assignments/7613276'),
  seed(88, 'Lecture 5.3: Deriving Finite Differences Using Taylor Series (11:05)', 'MAE 384', 5, '2026-10-01', '07:30', 'assignments/7613277'),
  seed(89, 'Lecture 5.4: Higher Order Finite Differences (33:50)', 'MAE 384', 5, '2026-10-01', '07:30', 'assignments/7613278'),
  seed(90, 'Recitation R5.1: Calculating First Derivatives Using Finite Differences (10:38)', 'MAE 384', 5, '2026-10-01', '23:59', 'assignments/7613385'),
  seed(91, 'Recitation R5.2 - Matlab Grader', 'MAE 384', 5, '2026-10-01', '23:59', 'assignments/7613386'),
  seed(92, 'Recitation R5.2: Coding Finite Differences (9:55)', 'MAE 384', 5, '2026-10-01', '23:59', 'assignments/7613387'),

  // Oct 4
  seed(93, 'Module 3 - Market Assignment: Marketplace Conversations (6)', 'Entrepreneurship & Value Creation', 25, '2026-10-04', '23:59', 'assignments/7495923'),
  seed(94, 'Module 3 - OPTIONAL Extra Credit', 'Entrepreneurship & Value Creation', 0, '2026-10-04', '23:59', 'assignments/7495924'),
  seed(95, 'Module 3 - Venture Assignment: EBPD - Featuring Competitive Analysis Slide Draft', 'Entrepreneurship & Value Creation', 10, '2026-10-04', '23:59', 'assignments/7495925'),
  seed(96, 'Module 3 - OPTIONAL Participation Assignment (Submit 5 Total)', 'Entrepreneurship & Value Creation', 0, '2026-10-04', '23:59', 'assignments/7814855'),

  // Oct 6
  seed(97, 'Lecture 5.5: Finite Differences for Higher Derivatives (6:08)', 'MAE 384', 5, '2026-10-06', '07:30', 'assignments/7613279'),
  seed(98, 'Lecture 5.6: Order of Accuracy (10:23)', 'MAE 384', 5, '2026-10-06', '07:30', 'assignments/7613280'),
  seed(99, 'Recitation R5.3: Code Example: The Observed Order of Accuracy (31:53)', 'MAE 384', 5, '2026-10-06', '23:59', 'assignments/7613388'),

  // Oct 7
  seed(100, 'Ch. 6 - Quiz 1', 'MAE 241', 5, '2026-10-07', '23:59', 'assignments/7667011'),
  seed(101, 'Ch. 6: Carnot Cycle and Carnot Principles (10:41)', 'MAE 241', 1, '2026-10-07', '23:59', 'assignments/7667012'),
  seed(102, 'Ch. 6: Carnot Heat Engines (16:37)', 'MAE 241', 1, '2026-10-07', '23:59', 'assignments/7667013'),
  seed(103, 'Ch. 6: Heat Engines (12:53)', 'MAE 241', 1, '2026-10-07', '23:59', 'assignments/7667014'),
  seed(104, 'Ch. 6: Intro to 2nd Law & Thermal Energy Reservoirs (5:15)', 'MAE 241', 1, '2026-10-07', '23:59', 'assignments/7667015'),
  seed(105, 'Ch. 6: Perpetual-Motion Machines (12:17)', 'MAE 241', 1, '2026-10-07', '23:59', 'assignments/7667016'),
  seed(106, 'Ch. 6: Refrigerators and Heat Pumps (10:22)', 'MAE 241', 1, '2026-10-07', '23:59', 'assignments/7667017'),

  // Oct 8
  seed(107, 'Lecture 5.7: Partial Finite Differences (25:35)', 'MAE 384', 5, '2026-10-08', '07:30', 'assignments/7613281'),
  seed(108, 'Class 13: Video 5.7', 'MAE 384', 5, '2026-10-08', '07:35', 'quizzes/2077845'),
  seed(109, 'Recitation R5.4: Partial Finite Differences (12:04)', 'MAE 384', 5, '2026-10-08', '23:59', 'assignments/7613389'),

  // Oct 11
  seed(110, 'Module 4 - Methods Assignment: Media Reflection Forum', 'Entrepreneurship & Value Creation', 20, '2026-10-11', '23:59', 'discussion_topics/7666980'),
  seed(111, 'Module 4 - OPTIONAL Extra Credit Assignment: Get over $1,000 worth of premium GoDaddy web domain and development tools!', 'Entrepreneurship & Value Creation', 0, '2026-10-11', '23:59', 'assignments/7495929'),
  seed(112, 'Module 4 - Venture Assignment: EBPD - Full Draft', 'Entrepreneurship & Value Creation', 20, '2026-10-11', '23:59', 'assignments/7495930'),
  seed(113, 'Module 4 Lecture: Creativity - 1 of 2 (10:39)', 'Entrepreneurship & Value Creation', 20, '2026-10-11', '23:59', 'assignments/7666515'),
  seed(114, 'Module 4 Lecture: Creativity - 2 of 2 (9:28)', 'Entrepreneurship & Value Creation', 20, '2026-10-11', '23:59', 'assignments/7666728'),
  seed(115, 'Homework H5.1', 'MAE 384', 10, '2026-10-11', '23:59', 'quizzes/2065478'),
  seed(116, 'Homework H5.2', 'MAE 384', 10, '2026-10-11', '23:59', 'quizzes/2065487'),

  // Oct 15
  seed(117, 'Lecture 6.1: Numerical Integration Overview (3:23)', 'MAE 384', 5, '2026-10-15', '07:30', 'assignments/7613282'),
  seed(118, 'Lecture 6.2: Newton Cotes Integration - Part 1 (8:01)', 'MAE 384', 5, '2026-10-15', '07:30', 'assignments/7613283'),
  seed(119, 'Lecture 6.3: Newton Cotes Integration - Part 2 (19:11)', 'MAE 384', 5, '2026-10-15', '07:30', 'assignments/7613284'),
  seed(120, 'Class 14: Videos 6.1-6.3', 'MAE 384', 5, '2026-10-15', '07:35', 'quizzes/2077839'),
  seed(121, 'Recitation R6.1: Composite Rectangle Method by Hand (5:40)', 'MAE 384', 5, '2026-10-15', '23:59', 'assignments/7613390'),
  seed(122, 'Recitation R6.2: Composite Trapezoidal Method by Hand (3:03)', 'MAE 384', 5, '2026-10-15', '23:59', 'assignments/7613391'),
  seed(123, 'Recitation R6.3 - Matlab Grader', 'MAE 384', 5, '2026-10-15', '23:59', 'assignments/7613392'),
  seed(124, 'Recitation R6.3: Coding Composite Trapezoidal Method (14:07)', 'MAE 384', 5, '2026-10-15', '23:59', 'assignments/7613393'),

  // Oct 18
  seed(125, 'Module 4 - Market Assignment: Marketplace Conversations (6)', 'Entrepreneurship & Value Creation', 25, '2026-10-18', '23:59', 'assignments/7495927'),
  seed(126, 'Module 4 - OPTIONAL Extra Credit', 'Entrepreneurship & Value Creation', 0, '2026-10-18', '23:59', 'assignments/7495928'),
  seed(127, 'Module 4 - Venture Assignment: EBPD V1 Video Pitch and Slide Deck', 'Entrepreneurship & Value Creation', 50, '2026-10-18', '23:59', 'discussion_topics/7666976'),
  seed(128, 'How are you doing in this Class?', 'Entrepreneurship & Value Creation', 10, '2026-10-18', '23:59', 'quizzes/2033544'),
  seed(129, 'Module 4 - OPTIONAL Participation Assignment (Submit 5 Total)', 'Entrepreneurship & Value Creation', 0, '2026-10-18', '23:59', 'assignments/7814879'),

  // Oct 19
  seed(130, 'Ch. 7 and 8 - Quiz 1', 'MAE 241', 5, '2026-10-19', '23:59', 'assignments/7667018'),
  seed(131, 'Ch. 7: Entropy (26:12)', 'MAE 241', 1, '2026-10-19', '23:59', 'assignments/7667022'),
  seed(132, 'Ch. 7: Entropy Changes of Pure Substance (15:57)', 'MAE 241', 1, '2026-10-19', '23:59', 'assignments/7667029'),
  seed(133, 'Ch. 8: Entropy Balance — Part 1 (11:50)', 'MAE 241', 1, '2026-10-19', '23:59', 'assignments/7667032'),
  seed(134, 'Ch. 8: Entropy Balance — Part 2 (5:50)', 'MAE 241', 1, '2026-10-19', '23:59', 'assignments/7667033'),
  seed(135, 'Ch. 8: Entropy Balance — Part 3 (8:32)', 'MAE 241', 1, '2026-10-19', '23:59', 'assignments/7667034'),

  // Oct 20
  seed(136, 'Lecture 6.4: Newton Cotes Integration - Part 3 (33:59)', 'MAE 384', 5, '2026-10-20', '07:30', 'assignments/7613285'),
  seed(137, 'Class 15: Video 6.4', 'MAE 384', 5, '2026-10-20', '07:35', 'quizzes/2077853'),
  seed(138, "Recitation R6.4: Composite Simpsons' Methods by Hand (16:05)", 'MAE 384', 5, '2026-10-20', '23:59', 'assignments/7613394'),
  seed(139, 'Recitation R6.5 - Matlab Grader', 'MAE 384', 5, '2026-10-20', '23:59', 'assignments/7613395'),
  seed(140, "Recitation R6.5: Coding Composite Simpson's ⅓ Method (14:36)", 'MAE 384', 5, '2026-10-20', '23:59', 'assignments/7613396'),

  // Oct 21
  seed(141, 'Ch. 7 and 8 - Quiz 2', 'MAE 241', 5, '2026-10-21', '23:59', 'assignments/7667019'),
  seed(142, 'Ch. 7: Property Diagrams Involving Entropy (10:41)', 'MAE 241', 1, '2026-10-21', '23:59', 'assignments/7667030'),
  seed(143, 'Ch. 7: The Tds Relations (11:57)', 'MAE 241', 1, '2026-10-21', '23:59', 'assignments/7667031'),
  seed(144, 'Ch. 8: Example problem on entropy change of solids (4:56)', 'MAE 241', 1, '2026-10-21', '23:59', 'assignments/7667035'),

  // Oct 22
  seed(145, 'Lecture 6.5: Integration Errors (9:15)', 'MAE 384', 5, '2026-10-22', '07:30', 'assignments/7613286'),
  seed(146, 'Lecture 6.6: Gaussian Quadrature (20:27)', 'MAE 384', 5, '2026-10-22', '07:30', 'assignments/7613287'),
  seed(147, 'Class 16: Videos 6.5-6.6', 'MAE 384', 5, '2026-10-22', '07:35', 'quizzes/2077844'),
  seed(148, 'Recitation R6.6 - Matlab Grader', 'MAE 384', 5, '2026-10-22', '23:59', 'assignments/7613397'),
  seed(149, 'Recitation R6.6: Calculating Integrals of Analytical Functions (12:31)', 'MAE 384', 5, '2026-10-22', '23:59', 'assignments/7613398'),
  seed(150, 'Recitation R6.7: Cantilevered Beam (29:21)', 'MAE 384', 5, '2026-10-22', '23:59', 'assignments/7613399'),

  // Oct 25
  seed(151, 'Module 5 - Methods Assignment: Media Reflection Forum', 'Entrepreneurship & Value Creation', 20, '2026-10-25', '23:59', 'discussion_topics/7666981'),
  seed(152, 'Module 5 - Venture Assignment: EBPD V1 Peer Evaluation and Feedback (Part 1)', 'Entrepreneurship & Value Creation', 0, '2026-10-25', '23:59', 'assignments/7495933'),
  seed(153, 'Module 5 - Venture Assignment: EBPD V1 Peer Evaluation and Feedback (Part 2)', 'Entrepreneurship & Value Creation', 10, '2026-10-25', '23:59', 'quizzes/2033541'),
  seed(154, 'Module 5 Lecture: Context (21:47)', 'Entrepreneurship & Value Creation', 20, '2026-10-25', '23:59', 'assignments/7667299'),
  seed(155, 'Homework H6.1', 'MAE 384', 10, '2026-10-25', '23:59', 'quizzes/2065474'),
  seed(156, 'Homework H6.2', 'MAE 384', 10, '2026-10-25', '23:59', 'quizzes/2065518'),
  seed(157, 'Homework H6.3', 'MAE 384', 10, '2026-10-25', '23:59', 'quizzes/2065516'),
  seed(158, 'Homework H6.4', 'MAE 384', 5, '2026-10-25', '23:59', 'quizzes/2065525'),

  // Oct 26
  seed(159, 'Ch. 7 and 8 - Quiz 3', 'MAE 241', 5, '2026-10-26', '23:59', 'assignments/7667020'),
  seed(160, 'Ch. 7: Entropy Change of Ideal Gases - Part 6 (13:09)', 'MAE 241', 1, '2026-10-26', '23:59', 'assignments/7667023'),
  seed(161, 'Ch. 7: Entropy Change of Ideal Gases — Part 1 (4:59)', 'MAE 241', 1, '2026-10-26', '23:59', 'assignments/7667024'),
  seed(162, 'Ch. 7: Entropy Change of Ideal Gases — Part 2 (3:31)', 'MAE 241', 1, '2026-10-26', '23:59', 'assignments/7667025'),
  seed(163, 'Ch. 7: Entropy Change of Ideal Gases — Part 3 (3:00)', 'MAE 241', 1, '2026-10-26', '23:59', 'assignments/7667026'),
  seed(164, 'Ch. 7: Entropy Change of Ideal Gases — Part 4 (3:55)', 'MAE 241', 1, '2026-10-26', '23:59', 'assignments/7667027'),
  seed(165, 'Ch. 7: Entropy Change of Ideal Gases — Part 5 (3:52)', 'MAE 241', 1, '2026-10-26', '23:59', 'assignments/7667028'),
  seed(166, 'Ch. 8: Example problem on entropy generation in heat exchanger (7:37)', 'MAE 241', 1, '2026-10-26', '23:59', 'assignments/7667036'),

  // Oct 27
  seed(167, 'Midterm Exam 3 - Placeholder', 'MAE 384', 0, '2026-10-27', '08:45', 'assignments/7671772'),

  // Oct 28
  seed(168, 'Ch. 7 and 8 - Quiz 4', 'MAE 241', 5, '2026-10-28', '23:59', 'assignments/7667021'),
  seed(169, 'Ch. 8: Isentropic Efficiencies of Steady-Flow Devices - Part 3 (6:05)', 'MAE 241', 1, '2026-10-28', '23:59', 'assignments/7667037'),
  seed(170, 'Ch. 8: Isentropic Efficiencies of Steady-Flow Devices — Part 1 (11:28)', 'MAE 241', 1, '2026-10-28', '23:59', 'assignments/7667038'),
  seed(171, 'Ch. 8: Isentropic Efficiencies of Steady-Flow Devices — Part 2 (10:22)', 'MAE 241', 1, '2026-10-28', '23:59', 'assignments/7667039'),
  seed(172, 'Ch. 8: Reversible Steady-Flow Work (18:42)', 'MAE 241', 1, '2026-10-28', '23:59', 'assignments/7667040'),

  // Oct 29
  seed(173, 'Lecture 7.1: ODEs Overview (16:21)', 'MAE 384', 5, '2026-10-29', '07:30', 'assignments/7613291'),
  seed(174, 'Lecture 7.2: Analytical Solutions of ODEs (23:38)', 'MAE 384', 5, '2026-10-29', '07:30', 'assignments/7613292'),
  seed(175, 'Lecture 7.3: Numerical Solutions of ODEs (9:18)', 'MAE 384', 5, '2026-10-29', '07:30', 'assignments/7613293'),
  seed(176, "Lecture 7.4: Euler's Explicit Method (14:55)", 'MAE 384', 5, '2026-10-29', '07:30', 'assignments/7613294'),
  seed(177, 'Recitation R7.1: Analytical Solutions to ODEs (10:43)', 'MAE 384', 5, '2026-10-29', '23:59', 'assignments/7613401'),
  seed(178, "Recitation R7.2: Euler's Explicit Method (9:06)", 'MAE 384', 5, '2026-10-29', '23:59', 'assignments/7613403'),
  seed(179, 'Recitation R7.3 - Matlab Grader', 'MAE 384', 5, '2026-10-29', '23:59', 'assignments/7613406'),
  seed(180, "Recitation R7.3: Coding Euler's Explicit Method (22:09)", 'MAE 384', 5, '2026-10-29', '23:59', 'assignments/7613407'),

  // Nov 1
  seed(181, 'Module 5 - Market Assignment: Marketplace Conversations (6)', 'Entrepreneurship & Value Creation', 25, '2026-11-01', '23:59', 'assignments/7495931'),
  seed(182, 'Module 5 - OPTIONAL Extra Credit', 'Entrepreneurship & Value Creation', 0, '2026-11-01', '23:59', 'assignments/7495932'),
  seed(183, 'Module 5 - Venture Assignment: EBPD V2 Video Pitch and Slide Deck', 'Entrepreneurship & Value Creation', 100, '2026-11-01', '23:59', 'discussion_topics/7666975'),
  seed(184, 'Module 5 - OPTIONAL Participation Assignment (Submit 5 Total)', 'Entrepreneurship & Value Creation', 0, '2026-11-01', '23:59', 'assignments/7814901'),

  // Nov 2
  seed(185, 'Ch. 10 - Quiz 1', 'MAE 241', 5, '2026-11-02', '23:59', 'assignments/7667095'),
  seed(186, 'Ch. 10: Air Standard Assumptions and Reciprocating Engines (8:56)', 'MAE 241', 1, '2026-11-02', '23:59', 'assignments/7666950'),
  seed(187, 'Ch. 10: Basics of Power Cycles (9:23)', 'MAE 241', 1, '2026-11-02', '23:59', 'assignments/7666951'),
  seed(188, 'Ch. 10: Diesel Cycle (9:19)', 'MAE 241', 1, '2026-11-02', '23:59', 'assignments/7666952'),
  seed(189, 'Ch. 10: Otto Cycle (16:53)', 'MAE 241', 1, '2026-11-02', '23:59', 'assignments/7666953'),

  // Nov 3
  seed(190, "Lecture 7.5: Euler's Implicit Method (19:29)", 'MAE 384', 5, '2026-11-03', '07:30', 'assignments/7613295'),
  seed(191, 'Lecture 7.6: Stability (7:59)', 'MAE 384', 5, '2026-11-03', '07:30', 'assignments/7613296'),
  seed(192, 'Lecture 7.7: Modified Euler Method (17:00)', 'MAE 384', 5, '2026-11-03', '07:30', 'assignments/7613297'),
  seed(193, 'Lecture 7.8: Midpoint Euler Method (13:42)', 'MAE 384', 5, '2026-11-03', '07:30', 'assignments/7613298'),
  seed(194, 'Lecture 7.9: Errors (11:06)', 'MAE 384', 5, '2026-11-03', '07:30', 'assignments/7613300'),

  // Nov 5
  seed(195, 'Lecture 7.10: Runge-Kutta Methods (25:12)', 'MAE 384', 5, '2026-11-05', '07:30', 'assignments/7613288'),
  seed(196, 'Lecture 7.11: Accuracy of Numerical Solutions of ODEs (21:09)', 'MAE 384', 5, '2026-11-05', '07:30', 'assignments/7613289'),
  seed(197, 'Recitation R7.4: Classical RK-4 Method (15:50)', 'MAE 384', 5, '2026-11-05', '23:59', 'assignments/7613408'),
  seed(198, 'Recitation R7.5 - Matlab Grader', 'MAE 384', 5, '2026-11-05', '23:59', 'assignments/7613409'),
  seed(199, 'Recitation R7.5: Coding Classical RK-4 Method (11:29)', 'MAE 384', 5, '2026-11-05', '23:59', 'assignments/7613410'),
  seed(200, 'Recitation R7.6: Calculating Accurate Solutions to ODEs (38:45)', 'MAE 384', 5, '2026-11-05', '23:59', 'assignments/7613412'),

  // Nov 8
  seed(201, 'Module 6 - Methods Assignment: Media Reflection Forum', 'Entrepreneurship & Value Creation', 20, '2026-11-08', '23:59', 'discussion_topics/7666982'),
  seed(202, 'Module 6 - Venture Assignment: EBPD V2 Peer Evaluation and Feedback (Part 1)', 'Entrepreneurship & Value Creation', 0, '2026-11-08', '23:59', 'assignments/7495936'),
  seed(203, 'Module 6 - Venture Assignment: EDPD V2 Peer Evaluation and Feedback (Part 2)', 'Entrepreneurship & Value Creation', 10, '2026-11-08', '23:59', 'quizzes/2033545'),
  seed(204, 'Module 6 Lecture: Create Value (21:47)', 'Entrepreneurship & Value Creation', 20, '2026-11-08', '23:59', 'assignments/7667460'),

  // Nov 10
  seed(205, 'Lecture 7.12: Numerical Solutions of Systems of ODEs (24:27)', 'MAE 384', 5, '2026-11-10', '07:30', 'assignments/7613242'),
  seed(206, 'Lecture 7.13: Numerical Solutions of Higher Order ODEs (13:13)', 'MAE 384', 5, '2026-11-10', '07:30', 'assignments/7613245'),
  seed(207, 'Lecture 7.14: Stiff ODEs (15:51)', 'MAE 384', 5, '2026-11-10', '07:30', 'assignments/7613290'),
  seed(208, 'Recitation R7.7 - Matlab Grader', 'MAE 384', 5, '2026-11-10', '23:59', 'assignments/7613413'),
  seed(209, 'Recitation R7.7: Coding RK-4 for Systems of ODEs (4:18)', 'MAE 384', 5, '2026-11-10', '23:59', 'assignments/7613414'),
  seed(210, 'Recitation R7.8: Solving Systems of ODEs (27:54)', 'MAE 384', 5, '2026-11-10', '23:59', 'assignments/7613415'),

  // Nov 15
  seed(211, 'Module 6 - Market Assignment: Marketplace Conversations (6)', 'Entrepreneurship & Value Creation', 25, '2026-11-15', '23:59', 'assignments/7495934'),
  seed(212, 'Module 6 - OPTIONAL Extra Credit', 'Entrepreneurship & Value Creation', 0, '2026-11-15', '23:59', 'assignments/7495935'),
  seed(213, 'Module 6 - Venture Assignment: EBPD V3 Video Pitch and Slide Deck', 'Entrepreneurship & Value Creation', 150, '2026-11-15', '23:59', 'discussion_topics/7666974'),
  seed(214, 'Module 6 - OPTIONAL Participation Assignment (Submit 5 Total)', 'Entrepreneurship & Value Creation', 0, '2026-11-15', '23:59', 'assignments/7814909'),
  seed(215, 'Homework H7.1', 'MAE 384', 10, '2026-11-15', '23:59', 'quizzes/2065509'),
  seed(216, 'Homework H7.2', 'MAE 384', 10, '2026-11-15', '23:59', 'quizzes/2065522'),
  seed(217, 'Homework H7.3', 'MAE 384', 10, '2026-11-15', '23:59', 'quizzes/2065510'),
  seed(218, 'Homework H7.4', 'MAE 384', 10, '2026-11-15', '23:59', 'quizzes/2065511'),

  // Nov 16
  seed(219, 'Ch 11 - Quiz 1', 'MAE 241', 5, '2026-11-16', '23:59', 'assignments/7666944'),
  seed(220, 'Ch. 11: Actual Vapor Power Cycles – Deviations from Ideal Rankine (15:38)', 'MAE 241', 1, '2026-11-16', '23:59', 'assignments/7666955'),
  seed(221, 'Ch. 11: Carnot and Ideal Rankine Vapor Cycles — Part 1 (4:22)', 'MAE 241', 1, '2026-11-16', '23:59', 'assignments/7666956'),
  seed(222, 'Ch. 11: Carnot and Ideal Rankine Vapor Cycles — Part 2 (11:47)', 'MAE 241', 1, '2026-11-16', '23:59', 'assignments/7666957'),
  seed(223, 'Ch. 11: Carnot and Ideal Rankine Vapor Cycles — Part 3 (13:16)', 'MAE 241', 1, '2026-11-16', '23:59', 'assignments/7666958'),
  seed(224, 'Ch. 11: Ideal Reheat Rankine Cycle (17:30)', 'MAE 241', 1, '2026-11-16', '23:59', 'assignments/7666959'),
  seed(225, 'Ch. 11: Increasing the Efficiency of the Rankine Cycle (23:40)', 'MAE 241', 1, '2026-11-16', '23:59', 'assignments/7666960'),

  // Nov 17
  seed(226, 'Midterm Exam 4 - Placeholder', 'MAE 384', 0, '2026-11-17', '08:45', 'assignments/7723863'),

  // Nov 22
  seed(227, 'Module 7 - Methods Assignment: Media Reflection Forum', 'Entrepreneurship & Value Creation', 20, '2026-11-22', '23:59', 'discussion_topics/7666983'),
  seed(228, 'Module 7 - Venture Assignment: EDPD V3 Pitch Playoffs - Force Ranking - Round 1', 'Entrepreneurship & Value Creation', 10, '2026-11-22', '23:59', 'quizzes/2033543'),
  seed(229, 'Module 7 Lecture - Cash (21:47)', 'Entrepreneurship & Value Creation', 20, '2026-11-22', '23:59', 'assignments/7667482'),

  // Nov 23
  seed(230, 'Ch. 12 - Quiz 1', 'MAE 241', 5, '2026-11-23', '23:59', 'assignments/7666961'),
  seed(231, 'Ch. 12: Actual Vapor Refrigeration Cycles (11:07)', 'MAE 241', 1, '2026-11-23', '23:59', 'assignments/7666962'),
  seed(232, 'Ch. 12: Ideal Vapor Refrigeration Cycles (18:14)', 'MAE 241', 1, '2026-11-23', '23:59', 'assignments/7666963'),
  seed(233, 'Ch. 12: Refrigeration Cycles (11:51)', 'MAE 241', 1, '2026-11-23', '23:59', 'assignments/7666964'),

  // Nov 29
  seed(234, 'Module 7 - OPTIONAL Extra Credit', 'Entrepreneurship & Value Creation', 0, '2026-11-29', '23:59', 'assignments/7495937'),
  seed(235, 'Module 7 - OPTIONAL Extra Credit Assignment: Win $1,000 in Seed Grant Funding', 'Entrepreneurship & Value Creation', 0, '2026-11-29', '23:59', 'assignments/7839346'),
  seed(236, 'Module 7 - OPTIONAL Participation Assignment (Submit 5 Total)', 'Entrepreneurship & Value Creation', 0, '2026-11-29', '23:59', 'assignments/7814911'),
  seed(237, 'Module 7 - Venture Assignment: EDPD V3 Pitch Playoffs - Force Ranking - Round 2', 'Entrepreneurship & Value Creation', 10, '2026-11-29', '23:59', 'quizzes/2033546'),

  // Dec 3
  seed(238, 'Midterm Exam 5 - Placeholder', 'MAE 384', 0, '2026-12-03', '08:45', 'assignments/7724234'),

  // Dec 4
  seed(239, 'Finals: Final Reflection', 'Entrepreneurship & Value Creation', 80, '2026-12-04', '23:59', 'discussion_topics/7666973'),
  seed(240, 'Finals: How did you do in this Class? (Required)', 'Entrepreneurship & Value Creation', 10, '2026-12-04', '23:59', 'quizzes/2033542'),

  // Dec 8
  seed(241, 'Makeup Exam - Placeholder', 'MAE 384', 0, '2026-12-08', '08:45', 'assignments/7724312'),
];
