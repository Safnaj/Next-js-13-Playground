export default function Header() {
  return (
    <div className='text-left text-lg py-3 m-auto flex justify-center'>
      <input
        className='rounded  mr-3 p-2 w-[450px]'
        type='text'
        placeholder='State, city or town'
      />
      <button className='rounded bg-red-600 px-9 py-2 text-white'>
        Let's go
      </button>
    </div>
  );
}
