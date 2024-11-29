

export default function LoginForm() {
  return (
    <div className="flex justify-center items-center h-96 w-full">
      <form action="" className="bg-lightpink py-10 px-5 rounded-sm grid grid-cols-1 gap-y-5 shadow-lg">
        <label className="" htmlFor="">
          Username
          <input type="text" name="username" />
        </label>
        <label className="" htmlFor="">
          Password
          <input type="password" name="password" />
        </label>

        <div className="flex justify-between">
          <button>Cancel</button>
          <button>Login</button>
        </div>
      </form>
    </div>
  )
}
