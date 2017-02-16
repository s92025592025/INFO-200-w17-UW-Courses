# UW-Courses
A module that contains the current active with full information UW class list.

## Getting Started
### How to install
Clone this repository to your working directory
```{bash}
$ git clone https://gitlab.com/s92025592025/UW-Classroom-Route.git
```

Then require it from it's directory
```{javascript}
require({/*YOUR DIRECTORY*/} + '/UW-Courses/UW-classes.js');
```

### Sample Code
Just call the function
```{javascript}
const UWClass = require({/*YOUR DIRECTORY*/} + '/UW-Courses/UW-classes.js');

UWClass.getAllClasses();
```