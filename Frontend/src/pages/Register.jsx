import { useState  } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../services/api";

function Register(){

    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    
    function handleChange (e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            await apiFetch("/auth/register",{
                method: "POST",
                body: JSON.stringify(form)
            });

            navigate("/login");
        }
        catch(error){
            setError(error.message);
        }
        finally{
            setLoading(false);
        }
    }

            return (
            <div>
                <h1>Register</h1>
                {error && <p style={{color: "red"}}>{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            value={form.username} 
                            onChange={handleChange} 
                        />
                        <br />
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                        />
                        <br />
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
                <button onClick={() => navigate("/login")}>Already have an account? Login</button>
            </div>
        )
}


export default Register;