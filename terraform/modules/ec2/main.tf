locals {
    instances = tomap({
        "${var.env}-master" = {
            instance_type = "t3.small"
            role = "master"
        }

        "${var.env}-worker" = {
            instance_type = "t3.micro"
            role = "worker"
        }
    })
}

resource "aws_key_pair" "my_key_pair" {
    key_name = "${var.env}-ec2-key"
    public_key = file("${path.root}/keys/todo-ec2-key.pub")
}

resource "aws_security_group" "my_sg" {
    name = "${var.env}-sg"
    description = "Allow access to ssh , http , https and port 3000"
    vpc_id = var.vpc_id 

    ingress {
        description = "Allow ssh"
        from_port = 22
        to_port = 22
        cidr_blocks = var.sg_cidr_block
        protocol = "tcp"
    }

     ingress {
        description = "Allow http"
        from_port = 80
        to_port = 80
        cidr_blocks = var.sg_cidr_block
        protocol = "tcp"
    }

     ingress {
        description = "Allow https"
        from_port = 443
        to_port = 443
        cidr_blocks = var.sg_cidr_block
        protocol = "tcp"
    }

     ingress {
        description = "Allow port 3000"
        from_port = 3000
        to_port = 3000
        cidr_blocks = var.sg_cidr_block
        protocol = "tcp"
    }

     egress {
        description = "Allow external access"
        from_port = 0
        to_port = 0
        cidr_blocks = var.sg_cidr_block
        protocol = "-1"
    }
}

resource "aws_instance" "my_instance" {
    for_each = local.instances 
    ami = var.ami
    instance_type = each.value.instance_type
    key_name = aws_key_pair.my_key_pair.key_name
    vpc_security_group_ids = [ aws_security_group.my_sg.id ]
    subnet_id = var.subnet_id
    user_data = file("${path.module}/scripts/install.sh")
#   each.value.role == "master" ? file("${path.module}/scripts/master.sh") : file("${path.module}/scripts/worker.sh")

    tags = {
        Name = each.key
    }

    root_block_device {
        volume_size = var.env == "prod" ? 13 : 10
        volume_type = "gp3"
    }
}