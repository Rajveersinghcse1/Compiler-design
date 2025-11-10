import React, {useState} from 'react';

const LoginForm=()=>{
    
    const[formData , setFormData] = useState({
        email: '',
        password: '', 
        rememberMe: false

    });
    const [isMobileMenuOpen , setIsMobileMenuOpen] = usestate(false);
    const [showPassword, setShowPassword] = useState(flase);

    const handleChange = (e) =>{
        const {name , value , type, checked} = e.target;
        setFormData((prev)=>({
            ...prev, 
            [name]:type=== "checkbox"?checked: value, 

        }));
    };
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log("Login Data: ", formate);
        alert("Login Successful! Check console for data. ");

    };

    const toggleMobileMenu = ()=>{
        setIsMobileMenuOpen(!isMobileMenuOpen);

    };

    const neonColors={
        yellow : "rgb(225,225,0)",
        blue   : "rgb(0,255, 255)",  
    };

    const customStyles= `
        @keyframes neonGlowYellow {
        0%, 100%{ box-shaodw: 0 0 5px ${neonColors. yellow}, 0 0 10 px ${neonColors.yellow};}
        50%{ box-shadow: 0 0 10px ${neonColors.yellow}, 0 0 20px ${neonColors.yellow};}
        }
        
        @keyframes neonGlowBlue{
        0% , 100% {box-shadow: 0 0 5px ${neonColors.blue}, 0 , 0 10px ${neonColors.blue};}
        50% {box-shadow: 0 0 10px ${neonColors.blue}, 0 0 20px ${neonColors.blue};}}
        .neon-text-blue {text-shadow : 0 0 5px ${neonColors.blue}, 0 0 10px ${neonColors.blue};}
        .neon-text-yellow{text-shadow: 0 0 5px ${neonColors.yellow}, 0 0 10px ${neonColors.yellow};}
        .input-neon-focus:focus{
            outline: none;
            box-shaodw: 0 0 0 2px rgba(0,0,0,0), 0 0 15px ${neonColors.blue} !important;
            }
        .button-neon-glow:hover{
            animation: neonGlowYellow 1.5s infinite alternate;
            }`;

        const inputClasses = 
           "w-full p-4 rounded-lg bg-gray-900 text-white border border-gray-800 focus:outline-none input-neon-focus transition duration-300 text-lg placeholder-gray-600";

        return(
            <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white flex flex-col">
                <style>{customStyles}</style>

                {/* Navbar */}
                <nav className = "w-full bg-black bg-opacity-90 backdrop-blur-sm border-b border-gray-800 shadow-lg py-4 px-6 flex justify-between items-center">
                    <div className="text-2xl font-bold neon-text-blue">
                        GeoBlast <span className= "neon-text-yellow">Login</span>
                    </div>
                    <div className="hidden md:flex space-x-6">
                        <a href="#" className = "text-gray-400 hover:text-blue-300">Home</a>
                        <a href="#" className = "text-gray-400 hover: text-blue-300">Services</a>
                    </div>
                    <div className="md:hidden">
                        <button onClick={toggleMobileMenu} className=" text-white text-2xl">
                            <i className = {isMobileMenuOpen ? " fas fa-times": "fas fa-bars"}></i>
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className = "md: hidden flex flex-col bg-black bg-opacity-95 p-4 space-y-4">
                        <a href="#" className="text-gray-400 hover: text-blue-300">Home</a>
                        <a href="#" className="text-gray-400 hover: text-blue-300">Services</a>
                    </div>
                )}

                {/* Login Form */}
                <div className ="flex flex-1 justify-center items-center px-4">
                    <div className="w-full max-w-md bg-black/80 backdrop-blur-lg p-8 rounded-xl border-gray-800 shadow-lg">
                        <div className="text-center mb-6">
                            <i className="fas fa-user-astronauut text-5xl text-blue-400 neon-text-blue"></i>
                            <h2 className="text-3xl font-bold neon-text-blue mt-2">Login</h2>
                            <p className="text-gray-500">Enter Your credentials</p>
                        </div>
                        <form onsumbit={handleSubmit} className="space-y-5">
                            <div>
                                <label className= " block text-gray-400 mb-1"> Email </label>
                                    <input 
                                    type="email"
                                    name="email"
                                    placeholder="Enter you email"
                                    className={inputClasses}
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    /> 
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-1">Password</label>
                                    <div className="relative">
                                        <input type={showPassword ? "text" : "password"}
                                        name="password" placeholder="Enter your password" className ={`${inputClasses} pr-12`} value={formData.password} onChange={handleChange}required/>
                                        <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                                        onclick={()=> setShowPassword(!showPassword)}>
                                            <i classname={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i> 
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <label className="flex items-center space-x-2">
                                            <input type ="checkbox" name="rememberMe" checked={formData.rememberMe}
                                              onChange={handleChange}
                                              classname="h-5 w-5"/>

                                            <span className ="text-gray-400">Remember me</span>
                                        </label>
                                        <a href="#" className="text-blue-400 text-sm">Forgot password?</a>
                                        </div>
                                        <button type="submit" className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold rounded-lg hover:from-yellow-400 hover:to-orange-400 button-neon-glow" >Login
                                        </button>
                                    </form> 
                                </div>
                            </div>
                        </div>
                    );
                };
export default LoginForm; 

