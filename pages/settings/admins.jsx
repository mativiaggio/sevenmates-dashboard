import Layout from "@/components/Layout/Layout";
import React, { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Pencil } from "lucide-react";
import axios from "axios";

function Admins() {
  const [editedAdmin, setEditedAdmin] = useState(null);
  const [admins, setAdmins] = useState([]);
  const [email, setEmail] = useState("");

  const date_options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  useEffect(() => {
    fetchAdmins();
  }, []);
  function fetchAdmins() {
    axios.get("/api/admins").then((result) => {
      setAdmins(result.data);
    });
  }

  async function saveAdmin(ev) {
    ev.preventDefault();
    const data = {
      email,
    };
    if (editedAdmin) {
      data._id = editedAdmin._id;
      await axios.put("/api/admins", data);
      setEditedAdmin(null);
    } else {
      await axios.post("/api/admins", data);
    }
    setEmail("");
    fetchAdmins();
  }

  function editAdmin(admin) {
    setEditedAdmin(admin);
    setEmail(admin.email);
  }

  async function deleteAdmin(admin) {
    const { _id } = admin;
    await axios.delete("/api/admins?_id=" + _id);
    fetchAdmins();
  }

  return (
    <Layout>
      <div className="sm:mr-5">
        <form className="main-form" onSubmit={saveAdmin}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10">
              <div className="mt-5 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-4">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="admin-name"
                    className="block text-sm font-medium leading-6 "
                  >
                    Email
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-black">
                      <Input
                        type="text"
                        name="admin-name"
                        id="admin-name"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="un_admin_copado@gmail.com"
                      />
                    </div>
                    <p className="my-3 text-sm leading-6 text-gray-600">
                      Con este campo podes agregar un nuevo admin. Solo tenes
                      que ingresar la dirección de mail de GOOGLE.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            {editedAdmin && (
              <Button
                onClick={() => {
                  setEditedAdmin(null);
                  setName("");
                }}
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Cancelar
              </Button>
            )}
            <Button
              type="submit"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Guardar
            </Button>
          </div>
        </form>
      </div>
      {!editedAdmin && (
        <Table className="basic mt-2 rounded-md overflow-hidden border-2 border-black border-collapse">
          <TableHeader className="bg-black">
            <TableRow>
              <TableHead className="text-white">Email</TableHead>
              <TableHead className="text-white">Fecha de alta</TableHead>
              <TableHead className="text-white text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {admins.length > 0 &&
              admins.map((admin) => (
                <TableRow id={admin._id} key={admin._id}>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>
                    {new Date(admin.creation_date).toLocaleDateString(
                      "es-ES",
                      date_options
                    )}
                  </TableCell>
                  <TableCell className="float-right flex">
                    <Button
                      onClick={() => editAdmin(admin)}
                      className="btn-default flex items-center justify-around mr-4"
                    >
                      <Pencil />
                      Editar
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger className="whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground h-10 px-4 py-2 btn-default flex items-center justify-around mr-4 hover:bg-red-400 bg-red-500">
                        Eliminar
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>PRESTA ATENCION</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción es completamente irreversible, estas
                            comepltamente seguro/a de querer eliminar este
                            admin?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteAdmin(admin)}
                            className="btn-red flex items-center justify-around hover:bg-red-500 bg-red-400 text-white"
                          >
                            Eliminar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </Layout>
  );
}

export default Admins;
