<%@ page contentType="text/html;charset=GBK" language="java" %>
<%@ page import="java.util.*" errorPage="" %>
<%@ page import="java.sql.*" %>

<% request.setCharacterEncoding("GBK");
   String user=request.getParameter("user");
   String pw=request.getParameter("pw");
   try{
     Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");

     //String spath="login.accdb";
     //String dbpath=application.getRealPath(spath);
     String dbuser="";
     String dbpw="";
     //String url="jdbc:odbc:Driver={Microsoft Access Driver (*.mdb,*.accdb)};DBQ="+dbpath;
     String url="jdbc:odbc:ec";
     Connection conn=DriverManager.getConnection(url,dbuser,dbpw);
     Statement stmt=conn.createStatement();
     String sql="select * from users where uname='"+user+"' and upw='"+pw+"'";
     ResultSet rs=stmt.executeQuery(sql);
     if(rs.next()){
       //out.print("Welcome "+rs.getString("uname"));
       response.sendRedirect("cart.jsp");
     }else {
       //out.println("Please Regist, first");
       response.sendRedirect("login.html");
     }
     rs.close();
     stmt.close();
     conn.close();
  
 }catch(Exception e){
    out.print("conn Error");
    out.println(e.getMessage());
  }
%>