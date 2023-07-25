import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  isError: false,
  courses: [],
  lessons: [],
  courseId: "",
  isSuccess: false,
  isRequestLoading: false,
  isResponseError: false,
  isLessonAddSuccess: false,
  isLessonEditSuccess: false,
};

// fetch course

export const fetchCourses = createAsyncThunk(
  "course/fetchCourses",
  async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/courses`
      );
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

// add new course

export const addCourse = createAsyncThunk(
  "course/addCourse",
  async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/courses/add`,
        formData
      );
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

// add new lesson

export const addLesson = createAsyncThunk(
  "course/addLesson",
  async ({ id, formData }) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/courses/addlesson/${id}`,
        formData
      );
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

// updateCourse new course

export const updateCourse = createAsyncThunk(
  "course/updateCourse",
  async ({ id, formData }) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/courses/edit/${id}`,
        formData
      );
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);
// add new course

export const updateLesson = createAsyncThunk(
  "course/updateLesson",
  async ({ id, formData }) => {
    console.log(id, formData);
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/courses/editlesson/${id}`,
        formData
      );
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

const courseSlice = createSlice({
  name: "courseSlice",
  initialState,
  reducers: {
    addLocalLessons: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.lessons = action.payload;
      } else {
        state.lessons.push(action.payload);
      }
      state.isLessonAddSuccess = true;
    },
    editLocalLesson: (state, action) => {
      const index = state.lessons?.findIndex(
        (obj) => obj.id === action.payload?.id
      );
      if (index !== -1) {
        state.lessons[index] = action.payload;
      }
      state.isLessonEditSuccess = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCourses.pending, (state) => {
      state.isError = false;
    });
    builder.addCase(fetchCourses.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.courses = action.payload;
      state.isSuccess = false;
    });
    builder.addCase(fetchCourses.rejected, (state) => {
      state.isError = true;
    });

    // add course
    builder.addCase(addCourse.pending, (state) => {
      state.isRequestLoading = true;
      state.isResponseError = false;
      state.isSuccess = false;
    });
    builder.addCase(addCourse.fulfilled, (state, action) => {
      state.isRequestLoading = false;
      state.isResponseError = false;
      state.isSuccess = true;
      state.courseId = action.payload?.insertedId;
    });
    builder.addCase(addCourse.rejected, (state) => {
      state.isRequestLoading = false;
      state.isResponseError = true;
      state.isSuccess = false;
    });

    // add course
    builder.addCase(addLesson.pending, (state) => {
      state.isRequestLoading = true;
      state.isResponseError = false;
      state.isLessonAddSuccess = false;
    });
    builder.addCase(addLesson.fulfilled, (state) => {
      state.isRequestLoading = false;
      state.isResponseError = false;
      state.isLessonAddSuccess = true;
    });
    builder.addCase(addLesson.rejected, (state) => {
      state.isRequestLoading = false;
      state.isResponseError = true;
      state.isLessonAddSuccess = false;
    });

    // update course
    builder.addCase(updateCourse.pending, (state) => {
      state.isRequestLoading = true;
      state.isResponseError = false;
      state.isSuccess = false;
    });
    builder.addCase(updateCourse.fulfilled, (state) => {
      state.isRequestLoading = false;
      state.isResponseError = false;
      state.isSuccess = true;
    });
    builder.addCase(updateCourse.rejected, (state) => {
      state.isRequestLoading = false;
      state.isResponseError = true;
      state.isSuccess = false;
    });

    // update course
    builder.addCase(updateLesson.pending, (state) => {
      state.isRequestLoading = true;
      state.isResponseError = false;
      state.isLessonEditSuccess = false;
    });
    builder.addCase(updateLesson.fulfilled, (state) => {
      state.isRequestLoading = false;
      state.isResponseError = false;
      state.isLessonEditSuccess = true;
    });
    builder.addCase(updateLesson.rejected, (state) => {
      state.isRequestLoading = false;
      state.isResponseError = true;
      state.isLessonEditSuccess = false;
    });
  },
});

export default courseSlice.reducer;
export const { addLocalLessons, editLocalLesson } = courseSlice.actions;
