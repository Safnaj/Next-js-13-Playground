import React from "react";

interface Props {
  inputs: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    password: string;
  };
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSignIn: boolean;
}

export default function AuthModalInputs({
  inputs,
  handleChangeInput,
  isSignIn,
}: Props) {
  return (
    <div>
      {isSignIn ? null : (
        <div className='my-3 flex justify-between text-sm'>
          <input
            type='text'
            className='border rounded p-2 py-3 w-[49%] bg-white'
            placeholder='First Name'
            value={inputs.firstName}
            onChange={handleChangeInput}
            name='firstName'
          />
          <input
            type='text'
            className='border rounded p-2 py-3 w-[49%] bg-white'
            placeholder='Last Name'
            value={inputs.lastName}
            onChange={handleChangeInput}
            name='lastName'
          />
        </div>
      )}
      <div className='my-3 flex justify-between text-sm'>
        <input
          type='text'
          className='border rounded p-2 py-3 w-full bg-white'
          placeholder='Email'
          value={inputs.email}
          onChange={handleChangeInput}
          name='email'
        />
      </div>
      {isSignIn ? null : (
        <div className='my-3 flex justify-between text-sm'>
          <input
            type='text'
            className='border rounded p-2 py-3 w-[49%] bg-white'
            placeholder='Phone'
            value={inputs.phone}
            onChange={handleChangeInput}
          />
          <input
            type='text'
            className='border rounded p-2 py-3 w-[49%] bg-white'
            placeholder='City'
            value={inputs.city}
            onChange={handleChangeInput}
          />
        </div>
      )}
      <div className='my-3 flex justify-between text-sm'>
        <input
          type='password'
          className='border rounded p-2 py-3 w-full bg-white'
          placeholder='Password'
          value={inputs.password}
          onChange={handleChangeInput}
        />
      </div>
    </div>
  );
}
