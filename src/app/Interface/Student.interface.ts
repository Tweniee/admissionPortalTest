export interface student {
  fullName: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  email: string;
  address: {
    building: string;
    area: string;
    state: string;
    city: string;
  };
  gender: string;
  skills: string[];
  educationDetails: {
    '10th': {
      marks: string;
      grade: string;
      yearOfPassing: string;
    };
    '12th': {
      marks: string;
      grade: string;
      yearOfPassing: string;
    };
    degree: {
      marks: string;
      grade: string;
      yearOfPassing: string;
    };
  };
}

export interface emitter {
    value: student;
    isEdit: boolean;
    index:number;
  }