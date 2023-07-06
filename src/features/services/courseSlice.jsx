import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  isError: false,
  courses: [],
  lessons: [],
  courseId: "",
  isSuccess: false,
  isLessonAddSuccess: false,
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
      console.log(error);
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
      console.log(error);
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
      console.log(error);
    }
  }
);

// add new course

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
      console.log(error);
    }
  }
);

const courseSlice = createSlice({
  name: "courseSlice",
  initialState,
  reducers: {
    addLocalLessons: (state, action) => {
      state.lessons.push(action.payload);
      state.isLessonAddSuccess = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCourses.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchCourses.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.courses = action.payload;
      state.isSuccess = false;
    });
    builder.addCase(fetchCourses.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    // add course
    builder.addCase(addCourse.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(addCourse.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.courseId = action.payload?.insertedId;
    });
    builder.addCase(addCourse.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });

    // add course
    builder.addCase(addLesson.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isLessonAddSuccess = false;
    });
    builder.addCase(addLesson.fulfilled, (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isLessonAddSuccess = true;
    });
    builder.addCase(addLesson.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isLessonAddSuccess = false;
    });

    // update course
    builder.addCase(updateCourse.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(updateCourse.fulfilled, (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
    });
    builder.addCase(updateCourse.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
  },
});

export default courseSlice.reducer;
export const { addLocalLessons } = courseSlice.actions;
