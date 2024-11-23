import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  example: string;
  exampleRequired: string;
};

export const ReactHookFormEdit = () => {
  const { register, handleSubmit, setValue } = useForm<Inputs>({
    defaultValues: {
      example: "test",
      exampleRequired: "required value",
    },
  });

  const [isEditing, setIsEditing] = useState<{
    example: boolean;
    exampleRequired: boolean;
  }>({
    example: false,
    exampleRequired: false,
  });

  const [savedValues, setSavedValues] = useState<Inputs>({
    example: "test",
    exampleRequired: "required value",
  });

  const handleEdit = (field: keyof Inputs) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
  };

  const handleCancel = (field: keyof Inputs) => {
    setIsEditing((prev) => ({ ...prev, [field]: false }));
    setValue(field, savedValues[field]); // Reset the input to the saved value
  };

  const handleSave: SubmitHandler<Inputs> = (data) => {
    setSavedValues((prev) => ({ ...prev, ...data })); // Save the updated value
    setIsEditing({ example: false, exampleRequired: false }); // Exit edit mode for all fields
  };

  return (
    <div className="border border-gray-300 w-96 p-4 mx-auto flex flex-col gap-4">
      {/* Field 1 */}
      {!isEditing.example ? (
        <div className="flex justify-between items-center">
          <span>{savedValues.example}</span>
          <button
            type="button"
            onClick={() => handleEdit("example")}
            className="text-blue-500 underline"
          >
            Edit
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(handleSave)}
          className="flex items-center gap-2"
        >
          <input
            {...register("example")}
            className="border border-gray-300 p-2 flex-1"
          />
          <button
            type="submit"
            className="border border-gray-300 bg-gray-200 p-2 rounded"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => handleCancel("example")}
            className="text-red-500 underline"
          >
            Cancel
          </button>
        </form>
      )}

      {/* Field 2 */}
      {!isEditing.exampleRequired ? (
        <div className="flex justify-between items-center">
          <span>{savedValues.exampleRequired}</span>
          <button
            type="button"
            onClick={() => handleEdit("exampleRequired")}
            className="text-blue-500 underline"
          >
            Edit
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(handleSave)}
          className="flex items-center gap-2"
        >
          <input
            {...register("exampleRequired")}
            className="border border-gray-300 p-2 flex-1"
          />
          <button
            type="submit"
            className="border border-gray-300 bg-gray-200 p-2 rounded"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => handleCancel("exampleRequired")}
            className="text-red-500 underline"
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};
