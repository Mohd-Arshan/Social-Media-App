import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../services/api";


function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
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
            await apiFetch("/auth/login", {
                method: "POST",
                body: JSON.stringify(form)
            });
            navigate("/interface");
        }
        catch (error) {
            setError(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    return (
            <div>
                <h1>Login</h1>
                {error && <p style={{ color: "red" }}>{error}</p>}

                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email"
                        autoComplete="new-password"
                    />
                    <br />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Password"
                        autoComplete="new-password"
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        );
}


export default Login;