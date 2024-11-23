import { SyntheticEvent } from "react";
import { SubmitHandler, useForm, ChangeHandler } from "react-hook-form";

type Inputs = {
  example: string;
  exampleRequired: string;
};

export const ReactHookForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border border-gray-300 flex flex-col gap-2 w-96 p-4 mx-auto"
    >
      {/* register your input into the hook by invoking the "register" function */}
      <input
        defaultValue="test"
        {...register("example", { onBlur: (e) => console.log(e.target.value) })}
        className="border border-gray-300 p-2"
      />

      {/* include validation with required or other standard HTML validation rules */}
      <input
        {...register("exampleRequired", { required: true })}
        className={`border border-gray-300 p-2 focus-visible:outline-red-600`}
      />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && (
        <span className="text-red-600">This field is required</span>
      )}

      <input
        type="submit"
        className="border border-gray-300 cursor-pointer bg-gray-200 rounded p-1"
      />
    </form>
  );
};
