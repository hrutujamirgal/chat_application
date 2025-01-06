/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { Input, Stack, Checkbox, Button } from "@chakra-ui/react";
import { useState } from "react";
import bg from "../assets/bg.jpg";
import { useAuth } from "../context/UserContext";

const Index = () => {
  const [button, setButton] = useState(false);
  const [islog, setIslog] = useState(true);
  const [data, setData] = useState();

  const { login, signup} = useAuth()

  const handleData = (name, value) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submit = async(type) => { 

    if(type==='login'){
        await login(data)
    }else if(type === 'signup'){
        await signup(data)
    }
  };

  const handleForgetPassword = () => {
    console.log("clicking successffully");
  };

  return (
    <>
      <div
        className="w-screen h-screen  m-0 flex flex-row p-32 justify-between overflow-x-hidden "
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay Layer */}
        <div
          className="absolute inset-0 bg-black opacity-60"
          style={{
            zIndex: 1,
          }}
        ></div>


        {/*content layer */}
        <div
          className="w-screen flex flex-row p-51 justify-between"
          style={{
            zIndex: 2,
          }}
        >
          <p className="text-white font-serif text-3xl md:text-3xl lg:text-6xl w-2/4 text-center pt-20">
            The Work Chat <p className="text-2xl">Chat with your Friends or Groups</p>
          </p>
          <div
            className="login bg-slate-50 w-96 h-fit
         rounded-md p-3 shadow-lg"
          >
            <p className="text-4xl font-serif font-bold text-center">Chatify</p>
            <hr />

            {islog ? (
              <>
                <div className="blockage-login p-3">
                  <p className="text-2xl font-serif font-semibold text-center text-blue-900">
                    Login
                  </p>
                  <br />
                  <Stack gap="4">
                    <Input placeholder="Name" name="name" variant="flushed" required onChange={(e)=>handleData("name", e.target.value)}/>
                    <Input
                      placeholder="Password"
                      name='password'
                      variant="flushed"
                      type="password"
                      required
                      onChange={(e)=>handleData(e.target.name, e.target.value)}
                    />
                    <Checkbox onChange={(e) => setButton(e.target.checked)}>
                      Accept terms and conditions
                    </Checkbox>
                    <Button
                      variant="solid"
                      colorScheme="blue"
                      isDisabled={!button}
                      onClick={()=>submit('login')}
                    >
                      Login
                    </Button>
                  </Stack>
                </div>
              </>
            ) : (
              <>
                <div className="blockage-signup p-3">
                  <p className="text-2xl font-serif font-semibold text-center text-blue-900">
                    SignUp
                  </p>
                  <br />
                  <Stack gap="4">
                    <Input placeholder="Name" namee='name' variant="flushed" required onChange={(e)=>handleData("name", e.target.value)}/>
                    
                    <Input
                      placeholder="Password"
                      name='password'
                      variant="flushed"
                      type="password"
                      required
                      onChange={(e)=>handleData(e.target.name, e.target.value)}
                    />
                    
                    <Input placeholder="Email" name='email' type="email" variant="flushed" required onChange={(e)=>handleData(e.target.name, e.target.value)} />

                    <Input
                      placeholder="GitHub Repo Link"
                      name='gitrepo'
                      variant="flushed"
                      required
                      onChange={(e)=>handleData(e.target.name, e.target.value)}
                    />
                    <Checkbox onChange={(e) => setButton(e.target.checked)}>
                      Accept terms and conditions
                    </Checkbox>
                    <Button
                      variant="solid"
                      colorScheme="blue"
                      isDisabled={!button}
                      onClick={()=> submit('signup')}
                    >
                      Sign Up
                    </Button>
                  </Stack>
                </div>
              </>
            )}

            {/*mandatory links like forgot password or  dont have an account signup*/}

            <p className="text-md font-sans">
              Forgot password!{" "}
              <span
                className="text-blue-700 cursor-pointer"
                onClick={handleForgetPassword}
              >
                
                Click Here
              </span>
            </p>

            {!islog ? (
              <p className="text-md font-sans">
                Already Have an Account{" "}
                <span
                  className="text-blue-700 cursor-pointer"
                  onClick={() => setIslog(true)}
                >
                  
                  Log-In
                </span>
              </p>
            ) : (
              <p className="text-md font-sans">
                Don't Have an Account{" "}
                <span
                  className="text-blue-700 cursor-pointer"
                  onClick={() => setIslog(false)}
                >
                  Sign-In
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
